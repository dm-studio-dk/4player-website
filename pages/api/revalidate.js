import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';

/**
 * Premium Revalidation Route
 * 
 * This endpoint uses HMAC signatures to verify that requests are legitimately sent by Sanity.
 * It provides instant updates for Pages, Articles, and Guides.
 */

// Next.js requirement: Disable body parser to verify the raw body signature
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBody(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

export default async function handler(req, res) {
  const signature = req.headers[SIGNATURE_HEADER_NAME];
  const body = await readBody(req);

  // 1. Verify Signature
  if (!isValidSignature(body, signature, process.env.SANITY_PREVIEW_SECRET)) {
    console.warn('[Revalidate] Invalid signature received');
    return res.status(401).json({ message: 'Invalid signature' });
  }

  const jsonBody = JSON.parse(body);
  const { _type, slug } = jsonBody;

  try {
    // 2. Map Document Type to URL Path
    let pathToRevalidate = null;

    if (slug?.current) {
      switch (_type) {
        case 'page':
          pathToRevalidate = slug.current === '/' ? '/' : `/${slug.current}`;
          break;
        case 'article':
          pathToRevalidate = `/nyheder/${slug.current}`;
          break;
        case 'guide':
          pathToRevalidate = `/guides/${slug.current}`;
          break;
        default:
          pathToRevalidate = `/${slug.current}`;
      }
    }

    // 3. Execute Revalidation
    if (pathToRevalidate) {
      console.info(`[Revalidate] Purging cache for: ${pathToRevalidate}`);
      await res.revalidate(pathToRevalidate);

      // If an article is updated, refresh the news feed/homepage
      if (_type === 'article') {
        await res.revalidate('/');
        await res.revalidate('/nyheder');
      }

      return res.json({ 
        revalidated: true, 
        path: pathToRevalidate,
        message: `Content of type ${_type} updated successfully.` 
      });
    }

    return res.json({ revalidated: false, message: 'No slug found in document' });

  } catch (err) {
    console.error('[Revalidate] Error:', err.message);
    return res.status(500).json({ message: err.message });
  }
}
