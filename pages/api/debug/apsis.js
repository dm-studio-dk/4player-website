// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const URL = ` http://se.api.anpdm.com/mailinglists/v2/all`

export default async function handler(req, res) {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `basic ${process.env.APSIS_API_KEY_BASE64}`,
            },
        }).then((r) => r.json())

        return res.status(200).json({ response, status: 200 })
    } catch (e) {
        console.log(e)

        return res
            .status(500)
            .json({ message: "Something went terribly wrong.", status: 500 })
    }
}
