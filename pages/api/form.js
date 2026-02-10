// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient, sendEmail } from "lib/ews"
import { renderText } from "lib/mail"

export default async function handler(req, res) {
    const { method, body } = req

    if (method !== "POST" || !body)
        return res.status(404).json({ message: "Not found", status: 404 })

    try {
        const { subject, data, lang, fields, formType } = body

        const client = await createClient()

        await sendEmail({
            client,
            email: process.env.FORM_RECIPIENT_EMAIL,
            subject: subject + " ***FORTROLIGT***",
            asHtml: false,
            content: renderText(fields, data),
        })

        if (formType == "membership") {
            let content = {
                client,
                email: data.email,
                asHtml: true,
                subject: "Tak for din indmeldelse i 4player",
                content: `
                    <p>
                        Vi har nu registreret modtagelse af dit ønske om indmeldelse. Indmeldelsen vil blive behandlet manuelt indenfor 1-2 arbejdsdage, hvorefter du vil modtage din konkrete bekræftelse på indmeldelse i form af en velkomstmail, ligesom du vil modtage en separat mail, hvor vi beder dig betale kontingent for indeværende kontingentperiode.
                    </p>
                    <p>
                        Hvis du ikke har modtaget disse 2 mails indenfor nogle få dage bør du tjekke dinuønsket post mappe, idet vi har erfaring for vores velkomstmails i sjældne tilfælde kan havne der.
                    </p>
                `,
            }
            if (lang == "en") {
                content = {
                    client,
                    email: data.email,
                    asHtml: true,
                    subject: "Thank you for signing up to 4player",
                    content: `
                        <p>
                            We have now registered your request for registration. The registration will be processed manually within 1-2 working days, after which you will receive your concrete confirmation of registration in the form of a welcome email, just as you will receive a separate email where we ask you to pay the membership fee for the current membership period.
                        </p>
                        <p>
                            If you have not received these 2 emails within a few days, you should check your junk mail folder, as we have experience that our welcome emails can in rare cases end up there.
                        </p>
                    `,
                }
            }
            sendEmail(content)
        }

        return res.status(200).json({
            name: "Success, email sent",
            message: body,
            status: 200,
        })
    } catch (e) {
        console.log(e)
        return res
            .status(500)
            .json({ message: "Error occured", error: e, status: 500 })
    }
}
