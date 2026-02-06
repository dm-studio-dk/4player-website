export function renderMail(fields, data) {
    const responses = fields
        .map((field) => `<li>${field.label}: ${data[field.name]}</li>`)
        .join("\n")

    return `<h3>Response from form</h3><br/><br/><ul style="list-style: none; padding: 0; margin: 0;">${responses}</ul>`
}

export function renderText(fields, data) {
    const responses = fields
        .map((field) => `${field.label}: ${data[field.name]}`)
        .join("\n------------------------------------------\n")

    return responses
}
