import { PropertySet } from "ews-javascript-api"
import { createProtectedBenefitsUrl } from "lib/benefits"
import {
    createClient,
    extendedPropertyDefinitions,
    fetchMember,
    sendEmail,
} from "lib/ews"
import { BENEFITS_MAIL } from "lib/mails"

export default async function handler(req, res) {
    const { email, phone } = req.body.data
    if (!email || !phone) return res.json({ error: "Not enough information" })

    try {
        const client = await createClient()
        const item = await fetchMember({
            client,
            email,
        })

        if (!item) {
            console.log("No member found")
            return res.json({ data: "Invalid credentials" })
        }

        const phoneMatch = matchesPhoneNumber(item, phone)

        if (!phoneMatch) {
            console.log("No phone match")
            return res.json({ data: "Invalid credentials" })
        }

        const properties = new PropertySet(...extendedPropertyDefinitions())
        await item.Load(properties)
        const activeMember = isActiveMember(item)

        if (!activeMember) {
            console.log("Not active member")
            return res.json({ data: "Invalid credentials" })
        }

        const signedURL = await createProtectedBenefitsUrl()
        await sendEmail({
            client,
            email,
            subject: "Medlemsrabatter",
            content: BENEFITS_MAIL({ url: signedURL }),
        })

        return res.json({
            data: {
                message: "Success",
            },
        })
    } catch (error) {
        console.log(error)
        return res.json({ error })
    }
}

export function isActiveMember(contact) {
    // date format 1999-12-31T07:00:00Z
    const rightsField = contact.ExtendedProperties.items.find(
        (p) => p.propertyDefinition.name == "Rettighedsdato",
    )
    if (!rightsField || !rightsField?.value?.originalDateInput) return false

    const rightsDate = new Date(rightsField.value.originalDateInput)
    const rangeStart = new Date("1901-01-01")
    const rangeEnd = new Date("2100-01-01")
    return rightsDate >= rangeStart && rightsDate <= rangeEnd
}

function matchesPhoneNumber(contact, phoneNumber = "") {
    let phoneClone = phoneNumber.replaceAll(" ", "")
    phoneClone = phoneClone.replaceAll("(", "")
    phoneClone = phoneClone.replaceAll(")", "")
    if (!phoneClone.startsWith("+45")) phoneClone = "+45" + phoneClone

    const numbersFromContact = Object.values(
        contact.PhoneNumbers.entries.objects,
    )
        .filter((e) => e.phoneNumber)
        .map((e) => e.phoneNumber.replaceAll(" ", ""))

    return numbersFromContact.includes(phoneClone)
}
