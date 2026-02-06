import { ConfidentialClientApplication } from "@azure/msal-node"
import {
    BodyType,
    ConnectingIdType,
    ContactSchema,
    DefaultExtendedPropertySet,
    EmailAddress,
    EmailMessage,
    ExchangeService,
    ExtendedPropertyDefinition,
    Folder,
    FolderId,
    ImpersonatedUserId,
    ItemView,
    MapiPropertyType,
    MessageBody,
    OAuthCredentials,
    SearchFilter,
    Uri,
} from "ews-javascript-api"

const config = {
    auth: {
        authority: `https://login.microsoftonline.com/${process.env.EWS_TENANT_ID}`,
        clientId: process.env.EWS_CLIENT_ID,
        clientSecret: process.env.EWS_CLIENT_SECRET,
    },
}

const clientCredentialRequest = {
    scopes: ["https://outlook.office365.com/.default"],
}

export async function createClient() {
    const cca = new ConfidentialClientApplication(config)
    const { accessToken } = await cca.acquireTokenByClientCredential(
        clientCredentialRequest,
    )
    const client = new ExchangeService()
    client.Url = new Uri("https://outlook.office365.com/ews/exchange.asmx")
    client.Credentials = new OAuthCredentials(accessToken)
    client.ImpersonatedUserId = new ImpersonatedUserId(
        ConnectingIdType.SmtpAddress,
        process.env.EWS_SENDER_EMAIL_ADDRESS,
    )

    return client
}

export async function fetchMember({ client, email }) {
    const rootFolder = await Folder.Bind(
        client,
        new FolderId(process.env.EWS_MEMBER_FOLDER_ID),
    )
    await rootFolder.Load()
    const filter = createSearchFilter({ email })
    const result = await rootFolder.FindItems(filter, new ItemView(3))
    if (result.Items.length > 1 || result.Items.length == 0) return null

    const item = result.Items[0]

    return item
}

function createSearchFilter({ email } = {}) {
    const filter = new SearchFilter.IsEqualTo(
        ContactSchema.EmailAddress1,
        email,
    )
    // const filter = new SearchFilter.Exists(rightsProperty)
    return filter
}
export function extendedPropertyDefinitions() {
    return [
        new ExtendedPropertyDefinition(
            DefaultExtendedPropertySet.PublicStrings,
            "Rettighedsdato",
            MapiPropertyType.SystemTime,
        ),
        new ExtendedPropertyDefinition(
            DefaultExtendedPropertySet.PublicStrings,
            "Type",
            MapiPropertyType.String,
        ),
    ]
}

// export async function sendEmailSMTP({ subject, email, content }) {
//     const transporter = createTransport({
//         host: process.env.EWS_SMTP_SERVER,
//         port: process.env.EWS_SMTP_PORT,
//         secure: false,
//         from: `${process.env.EWS_SENDER_NAME} <${process.env.EWS_SENDER_EMAIL_ADDRESS}>`,
//     })

//     try {
//         const info = await transporter.sendMail({
//             to: email,
//             subject,
//             text: content,
//         })

//         return true
//     } catch (e) {
//         console.log(e)
//         return false
//     }
// }
export async function sendEmail({ client, subject, email, content, asHtml }) {
    const message = new EmailMessage(client)

    message.From = new EmailAddress(
        process.env.EWS_SENDER_NAME,
        process.env.EWS_SENDER_EMAIL_ADDRESS,
    )
    message.ToRecipients.Add(email)
    message.Subject = subject
    message.Body = new MessageBody(
        asHtml ? BodyType.HTML : BodyType.Text,
        asHtml ? wrapInCDATA(content) : content,
    )

    try {
        await message.Send()
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

function wrapInCDATA(content) {
    return "<![CDATA[" + content + "]]>"
}
