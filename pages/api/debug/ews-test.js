import { PropertySet } from "ews-javascript-api"
import { createClient, extendedPropertyDefinitions, fetchMember } from "lib/ews"

export default async function handler(req, res) {
    if (!req.query?.email || !req.query?.phone)
        return res.json({ error: "Not enough information" })

    try {
        const client = await createClient()
        const item = await fetchMember({
            client,
            email: req.query.email,
        })

        let data = {
            matchesPhoneNumber: matchesPhoneNumber(item, req.query.phoneNumber),
        }
        if (!data.matchesPhoneNumber) {
            return res.json({ data: "Invalid credentials" })
        }

        const properties = new PropertySet(...extendedPropertyDefinitions())
        await item.Load(properties)
        data.activeMember = isActiveMember(item)

        if (!data.activeMember) {
            return res.json({ data: "Invalid credentials" })
        }

        return res.json({ data })
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
    const numbersFromContact = Object.values(
        contact.PhoneNumbers.entries.objects,
    )
        .filter((e) => e.phoneNumber)
        .map((e) => e.phoneNumber.replaceAll(" ", ""))

    return numbersFromContact.includes(phoneNumber.replaceAll(" ", ""))
}
