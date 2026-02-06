export const submitForm = async ({ form, formType, subject, lang, fields }) => {
    try {
        const data = createObjectFromForm(form)
        const request = await fetch("/api/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data,
                fields,
                lang,
                formType,
                subject,
            }),
        }).then((r) => r.json())

        return request
    } catch {
        // console.log("Error", e)

        return null
    }
}
export const submitNewsletterForm = async ({ form }) => {
    try {
        const data = createObjectFromForm(form)
        const request = await fetch("/api/newsletter", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data,
            }),
        }).then((r) => r.json())

        return request
    } catch {
        // console.log("Error", e)

        return null
    }
}

export const submitBenefitsRequest = async ({ form }) => {
    try {
        const data = createObjectFromForm(form)
        const request = await fetch("/api/benefits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                data,
            }),
        }).then((r) => r.json())

        return request
    } catch {
        // console.log("Error", e)

        return null
    }
}

function createObjectFromForm(form) {
    return [...new FormData(form)].reduce((total, [key, value]) => {
        total[key] = value

        return total
    }, {})
}
