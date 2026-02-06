// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const URL = `http://se.api.anpdm.com/v1/subscribers/mailinglist/${process.env.APSIS_MAILING_LIST_ID}/create?updateIfExists=true`

export default async function handler(req, res) {
    const { method, body } = req
    // Disabled server-side to stop spam signups without deleting logic.
    return res.status(410).json({ message: "Newsletter signup disabled." })
    if (method !== "POST" || !body?.data?.email)
        return res.status(400).json({ message: "No email given" })

    try {
        await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `basic ${process.env.APSIS_API_KEY_BASE64}`,
            },
            body: JSON.stringify({
                Email: body.data.email,
            }),
        }).then((r) => r.text())

        return res
            .status(200)
            .json({ message: "Succesfully signed up.", status: 200 })
    } catch (e) {
        console.log(e)

        return res
            .status(500)
            .json({ message: "Something went terribly wrong.", status: 500 })
    }
}
