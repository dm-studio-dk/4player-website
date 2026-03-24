import { groq } from "next-sanity";

export const slugPathsQuery = groq`*[defined(slug)].slug.current`;

export const moreArticlesQuery = (
    start = 0,
    end = 10,
) => groq`*[_type == 'article' && publishedAt < now() && type != 'pressrelease' && !(_id in path("drafts.**"))] | order(publishedAt desc) [${start}...${end}]  {    
    ${articlePreviewFragment}
}`;
export const morePressreleasesQuery = (
    start = 0,
    end = 10,
) => groq`*[_type == 'article' && type == 'pressrelease' && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc) [${start}...${end}]  {    
    ${articlePreviewFragment}
}`;
export const moreEpisodesQuery = (
    start = 0,
    end = 10,
) => groq`*[_type == "article" && type == "podcast" && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc) [${start}...${end}]  {    
    ${articlePreviewFragment}
}`;

const imageFragment = groq`
    crop,
    hotspot,
    asset-> {
        _id,
        metadata {
            lqip,
            dimensions {
                width, height, aspectRatio
            },
        }
    }
`;

const articlePreviewFragment = groq`
    id,
    _id,
    title,
    subtitle,
    publishedAt,
    slug,
    podcast,
    image {
        ${imageFragment}
    },
    type,
    author-> {
        name,
        title,
        image
    },
`;

const moduleFragments = {
    moduleHero: groq`
        title,
        subtitle,
        imageBackground,
        image {
            ${imageFragment}
        }
    `,
    moduleHeroSlider: groq`
        slides[] {
            _key,
            title,
            subtitle,
            referenceType,
            reference-> {
                slug
            },
            url,
            label,
            image {
                ${imageFragment}
            }
        }
    `,
    moduleTable: groq`
        title,
        notes,
        columns[] {
            title,
            rows
        }
    `,
    moduleArticleList: groq`
        title,
        articles[]-> {
            ${articlePreviewFragment}
        }
    `,
    moduleImageList: groq`
        title,
        items[] {
            _id,
            _key,
            title,
            body[] {
                ...,
                markDefs[] {
                    ...,
                    _type == 'internalLink' => {
                        "slug": @.reference->slug
                    },
                }
            },
            readMore[] {
                _key,
                linkType,
                buttonLabel,
                url,
                reference-> { slug }
            },
            image {
                ${imageFragment}
            }
        }
    `,
    moduleImageCaroussel: groq`
        images[] {
            _id,
            _key,
            ${imageFragment}
        }
    `,
    moduleHighlightNumbers: groq`
        items[] {
            _key,
            number, 
            title,
            text,
            reference-> {
                slug
            }
        }
    `,
    moduleBenefitsRequest: groq`
        title,
        description,
        page-> { slug }
    `,
    moduleHistoryList: groq`
        "years": *[_type == 'history'] | order(year desc) {
            _id,
            year,
            image {
                ${imageFragment}
            },
            events[] {
                title,
                body[] {
                    ...
                }
            }   
        }
    `,
    moduleText: groq`
        title,
        body[] {
            ...,
            _type == 'factbox' => {
                ...,
                image {
                    ${imageFragment}
                },
                body[] {
                    ...,
                    markDefs[] {
                        ...,
                        _type == 'internalLink' => {
                            "slug": @.reference->slug
                        }
                    }
                }
            },
            markDefs[] {
                ...,
                _type == 'internalLink' => {
                    "slug": @.reference->slug
                },
            }
        }
    `,
    modulePodcastList: groq`
        title,
        "podcasts": *[_type == 'article' && type == 'podcast' && publishedAt < now()] {
            title,
            podcast,
            publishedAt,
            image {
                ${imageFragment}
            },
            author-> {
                name
            }
        }
    `,
    moduleTeaserGuides: groq`
        title,
        subtitle,
        hasBackground,
        guides[]-> {
            title,
            subtitle,
            description,
            slug
        }
    `,
    moduleTeaserPodcast: groq`
        title,
        mode == 'selected' => {
            episode-> {
                title,
                podcast,
                publishedAt,
                slug,
                type
            }
        },
        mode == 'latest' => {
            "episode": *[_type == 'article' && type == 'podcast' && publishedAt < now()] | order(publishedAt desc) {
                title,
                podcast,
                publishedAt,
                slug,
                type
            }[0]
        }
    `,
    moduleTeaserPressrelease: groq`
        title,
        mode == 'selected' => {
            pressrelease-> {
                title,
                publishedAt,
                slug,
                type,
                theme-> {
                    title
                },
                image {
                    ${imageFragment}
                }
            }
        },
        mode == 'latest' => {
            "pressrelease": *[_type == 'article' && type == 'pressrelease' && publishedAt < now()] | order(publishedAt desc) {
                title,
                publishedAt,
                slug,
                type,
                theme-> {
                    title
                },
                image {
                    ${imageFragment}
                }
            }[0]
        }
    `,
    moduleTeaserArticles: groq`
        title,
        mode == 'selected' => {
            articles[]-> {
                ${articlePreviewFragment}
            }
        },
        mode == 'latest' => {
            "articles": *[_type == 'article' && publishedAt < now()] | order(publishedAt desc) {
                ${articlePreviewFragment}
            }[0..2]
        }
    `,
    moduleTeaserInitiatives: groq`
        title,
        subtitle,
        initiatives[]-> {
            title,
            description,
            slug,
            image {
                ${imageFragment}
            }
        }
    `,
    modulePricingTable: groq`
        plans[] {
            _key,
            title,
            description,
            price
        }
    `,
    moduleForm: groq`
        title,
        description,
        formType,
        subject,
        english,
        customFields[] {
            name,
            label,
            required,
            "type": select(
                name == "email" => "email",
                "text"
            )
        }
    `,
    moduleContactPerson: groq`
        teaser,
        person-> {
            name,
            phone,
            email,
            title,
            image {
                ${imageFragment}
            }
        }
    `,
    modulePromo: groq`
        title,
        content,
        linkType,
        orientation,
        imageBackground,
        image {
            ${imageFragment}
        },
        reference-> { slug },
        url,
        buttonLabel,
    `,
    moduleGuideList: groq`
        "guides": *[_type == "guide"] {
            _id,
            _key,
            _updatedAt,
            title,
            slug,
            description
        }
    `,
    modulePersonList: groq`
        title,
        mode == 'selected' => {
            people[]-> {
                _id,
                name,
                title,
                shortName,
                bio,
                history,
                phone,
                email,
                image {
                    ${imageFragment}
                }
            }
        },
        mode == 'department' => {
            "people": *[_type == "person" && department == ^.department] {
                _id,
                name,
                title,
                shortName,
                bio,
                history,
                phone,
                email,
                image {
                    ${imageFragment}
                }
            }
        },
        mode == 'all' => {
            "people": *[_type == "person"] {
                _id,
                name,
                title,
                shortName,
                bio,
                history,
                phone,
                email,
                image {
                    ${imageFragment}
                }
            }
        }
    `,
};

const moduleListFragment = Object.entries(moduleFragments).reduce(
    (query, [type, projection]) => {
        return groq`
        ${query}${query.length > 0 ? "," : ""}
        _type == '${type}' => {
            ${projection}
        }
    `;
    },
    ``,
);

const pageFragment = groq`
    _id,
    _key,
    _type,
    slug,
    title,
    heading,
    description,
    seoTitle,
    _updatedAt,
    modules[] {
        _type,
        _key,
        ${moduleListFragment}
    }
`;

export const articleFragment = groq`
    type,
    title,
    subtitle,
    publishedAt,
    _updatedAt,
    theme-> {
        _id,
        title, 
        slug
    },
    shortName,
    author-> {
        name,
        title,
        shortName,
        image {
            ${imageFragment}
        }
    },
    image {
        ${imageFragment}
    },
    imageCaption,
    slug,
    style {
        ...
    },
    contact-> {
        name,
        image {
            ${imageFragment}
        },
        title,
        email,
        phone
    },
    podcast {
        episode,
        number,
        apple,
        spotify,
        soundcloud
    },
    body[] {
        ...,
        _type == 'referenceBlock' => {
            title,
            reference-> {
                _type,
                _id,
                title,
                image {
                    ${imageFragment}
                },
                slug
            },
        },
        _type == 'imageCaption' => {
            caption,
            image {
               ${imageFragment}
            }
        },
        _type == 'factbox' => {
            ...,
            image {
                ${imageFragment}
            },
            body[] {
                ...,
                markDefs[] {
                    ...,
                    _type == 'internalLink' => {
                        "slug": @.reference->slug
                    }
                }
            }
        },
        markDefs[] {
            ...,
            _type == 'internalLink' => {
               "slug": @.reference->slug
            }
        }
    },
    // relatedArticles logic
    relatedArticles[]-> { ${articlePreviewFragment} },
    "themeArticles": *[_type == 'article' && publishedAt < now() && references(^.theme._ref) && !(_id in path(^._id)) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
            ${articlePreviewFragment}
        } [0..2],
    "latestArticles": *[_type == 'article' && publishedAt < now() && !(_id in path(^._id)) && !(_id in path("drafts.**"))] | order(publishedAt desc) { ${articlePreviewFragment} } [0..2]
`;

const guideFragment = groq`
     _updatedAt,
    title,
    subtitle,
    publishedAt,
    body[] {
        ...,
        _type == 'accordion' => {
            ...,
            items[] {
                _key,
                title,
                body[] {
                    ...
                }
            }
        },
        _type == 'referenceBlock' => {
            title,
            reference-> {
                _type,
                _id,
                title,
                image {
                    ${imageFragment}
                },
                slug
            },
        },
        _type == 'highlight' => {
            ...,
            body[] {
                ...,
                markDefs[] {
                    ...,
                    _type == 'internalLink' => {
                        "slug": @.reference->slug
                    }
                }
            }
        },
        _type == 'moduleTable' => {
            ${moduleFragments.moduleTable}
        },
        _type == 'modulePersonList' => {
            ${moduleFragments.modulePersonList}
        },
        markDefs[] {
            ...,
            _type == 'internalLink' => {
                "slug": @.reference->slug
            }
        }
    },
    contact {
        person-> {
            _id,
            name,
            image {
                ${imageFragment}
            },
            title,
            email,
            phone
        },
        teaser
    },
    "relatedGuides": *[_type == 'guide' && !(_id in path(^._id))] {
        title,
        subtitle,
        slug
    } [0..4]
`;

export const homeSlugQuery = groq`*[_type == 'siteSettings'][0].homepage->.slug.current`;

export const globalSetingsQuery = groq`{
    "header": *[_type == 'header' && _id == 'header'] {
        navigation[] {
            label,
            external,
            url,
            isButton,
            hasSubmenu,
            linkTo-> { slug },
            subLinks[] {
                label,
                external,
                url,
                isButton,
                hasSubmenu,
                linkTo-> { slug },
            }
        }
    }[0],
    "footer": *[_type == 'footer' && _id == 'footer'] {
        description,
        links[] { ... },
        contact { ... },
        social { ... },
        newsletter { ... }
    }[0]
}`;

export const contentBySlugQuery = (
    mainBody,
) => groq`*[_type == 'siteSettings'][0]{
   "globalSettings": ${globalSetingsQuery},
   "page": *[
        _type == $type &&
        $isHomeRoute && _id == ^.homepage._ref || slug.current == $slug &&
        ($skipProtection || protected != true) &&
        ((!defined(publishedAt) || $preview) || defined(publishedAt) && publishedAt < now())] | order(_updatedAt desc)[0] {
        _id,
        _type,
        _updatedAt,
        title,
        description,
        redirectUrl,
        seoTitle,
        seoDescription,
        seoImage {
            ${imageFragment}
        },
        ${mainBody}
   }
}`;

export const usedModulesFragment = groq`array::unique(modules[]._type)`;

export const draftQuery = groq`*[$slug == '/' && slug.current == ${homeSlugQuery} || slug.current == $slug]`;

export const searchQuery = (
    start = 0,
    end = 10,
) => groq`*[[title, subtitle, description, pt::text(body), modules[0].title, pt::text(modules[0].subtitle), slug.current] match [$term, $term + "*", "*" + $term]] |
    score(
        title match $term,
        boost(pt::text(body) match $term, 1)
    ) | order(_score desc) {
        _score,
        _id,
        _type,
        title,
        description,
        subtitle,
        publishedAt,
        body,
        type,
        slug,
        image {
            ${imageFragment}
        },
    } [${start}...${end}]
`;

export const queryMap = {
    "/nyheder": {
        type: "page",
        query: groq`
            _updatedAt,
            "articles": *[_type == 'article' && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...10] {    
                ${articlePreviewFragment}
            },
            "featuredTheme": *[*[_id == 'newsSettings'][0].featuredTheme._ref == _id][0] {
                _id,
                title,
                subtitle [] {
                    ...
                },
                "articles": *[_type == 'article' && references(^._id) && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...3]  {    
                    ${articlePreviewFragment}
                }
            }
        `,
    },
    "/podcast": {
        type: "article",
        query: groq`
            _updatedAt,
            "episodes": *[_type == 'article' && type == 'podcast' && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...10]  {    
                ${articlePreviewFragment}
            },
        `,
    },
    "/initiativ/*": {
        type: "intiative",
        query: groq`
            _updatedAt,
            title,
            description,
            slug,
            about,
            image {
                ${imageFragment}
            },
            projects[] {
                _key,
                description,
                ${moduleFragments.modulePromo}
            },
            "relatedContent": *[references(^._id) && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc) {
                ${articlePreviewFragment}
            }
        `,
    },
    "/pressemeddelelser": {
        type: "page",
        query: groq`
            _updatedAt,
            "pressreleases": *[_type == 'article' && type == 'pressrelease' && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...10]  {    
                ${articlePreviewFragment}
            },
        `,
    },
    "/artikel/*": {
        type: "article",
        query: groq`
            ${articleFragment}
        `,
    },
    "/theme/*": {
        type: "theme",
        query: groq`
            _updatedAt,
            "articles": *[_type == 'article' && references(^._id) && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)  {
                ${articlePreviewFragment}
            },
        `,
    },
    "/guide/*": {
        type: "guide",
        query: groq`
            ${guideFragment}
        `,
    },
    "/*": {
        type: "page",
        query: groq`
            ${pageFragment}
        `,
    },
};
