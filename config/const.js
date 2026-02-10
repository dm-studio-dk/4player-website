export const ARTICLE_TYPE_LABELS = {
    podcast: "Podcast",
    standard: "Artikel",
    opinion: "Holdning",
    pressrelease: "Presse",
    feature: "Feature",
}

export const ARTICLE_COLOR_THEMES = {
    standard: "theme-green-light",
    podcast: "theme-green-light",
    opinion: "theme-green-dark",
    pressrelease: "theme-green-dark",
    feature: "theme-green-light",
}

export const FORM_CONFIG = {
    protreatment: [
        {
            name: "fullName",
            label: "Fulde navn",
            type: "text",
        },
        {
            name: "email",
            label: "E-mail",
            type: "email",
        },
        {
            name: "mobile",
            label: "Mobilnummer",
            type: "text",
        },
        {
            name: "club",
            label: "Klub/tidligere klub",
            type: "text",
        },
    ],
    membership: [
        {
            name: "fullName",
            label: "Fulde navn",
            type: "text",
        },
        {
            name: "club",
            label: "Klub",
            type: "text",
        },
        {
            name: "address",
            label: "Adresse",
            type: "text",
        },
        {
            name: "zip",
            label: "Postnummer",
            type: "text",
        },
        {
            name: "city",
            label: "By",
            type: "text",
        },
        {
            name: "cpr",
            label: "CPR Nummer",
            type: "text",
        },
        {
            name: "mobile",
            label: "Mobilnummer",
            type: "text",
        },
        {
            name: "email",
            label: "E-mail",
            type: "email",
        },
        {
            name: "contractType",
            label: "Kontrakttype",
            type: "select",
            options: [
                {
                    value: "Amatør (også pt. uden klub)",
                },
                {
                    value: "Bibeskæftiget",
                },
                {
                    value: "Trainee",
                },
                {
                    value: "Deltid",
                },
                {
                    value: "Fuldtid",
                },
                {
                    value: "Udland",
                },
            ],
        },
    ],
    membership_english: [
        {
            name: "fullName",
            label: "Full Name",
            type: "text",
        },
        {
            name: "club",
            label: "Club",
            type: "text",
        },
        {
            name: "address",
            label: "Address",
            type: "text",
        },
        {
            name: "zip",
            label: "Zip Code",
            type: "text",
        },
        {
            name: "city",
            label: "City",
            type: "text",
        },
        {
            name: "cpr",
            label: "CPR Number",
            type: "text",
        },
        {
            name: "mobile",
            label: "Phone Number",
            type: "text",
        },
        {
            name: "email",
            label: "E-mail",
            type: "email",
        },
        {
            name: "contractType",
            label: "Contract Type",
            type: "select",
            options: [
                {
                    value: "Amateur (including no current club)",
                },
                {
                    value: "Bibeskæftiget", // ??
                },
                {
                    value: "Trainee",
                },
                {
                    value: "Part-time",
                },
                {
                    value: "Full-time",
                },
                {
                    value: "International", // ??
                },
            ],
        },
    ],
    general: [
        {
            name: "email",
            label: "E-mail",
            type: "email",
        },
    ],
}
