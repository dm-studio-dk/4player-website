const pxToRem = (px) => `${px / 16}rem`

const withOpacityValue = (variable) => {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `rgb(var(${variable}))`
        }
        return `rgb(var(${variable}) / ${opacityValue})`
    }
}

module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                "fade-in": "1s ease-out 0.5s forwards fadeIn",
            },
            aspectRatio: {
                thumbnail: "1.6",
            },
            fontFamily: {
                sans: ["KP Sans", "sans-serif"],
                serif: ["GT Alpina", "serif"],
                display: ["FourPlayer", "sans-serif"],
            },
            colors: {
                // New 4player Palette
                green: {
                    dark: "#253900",   // MØRK GRØN
                    dusty: "#899E7F",  // STØVET GRØN
                    light: "#D9E9CF",  // LYS GRØN
                },
                gray: {
                    light: "#F0F0F0",  // LYS GRÅ
                },
                white: "#FFFFFF",      // HVID
                black: {
                    full: "#000000",   // SORT
                    almost: "#141414", 
                },

                "current-theme": withOpacityValue("--color-theme"),
                "current-theme-overlay": withOpacityValue(
                    "--color-theme-overlay",
                ),

                /* OLD COLORS
                black: {
                    full: "#000000",
                    almost: "#141414",
                },
                gray: {
                    base: "#d9d9d9",
                },
                orange: {
                    light: "#EA9973",
                    base: "#D95F25",
                },
                beige: {
                    "extra-light": "#F3EFED",
                    light: "#F1EBE7",
                    medium: "#E5DCD6",
                    dark: "#DBD2CB",
                },
                green: {
                    washed: "#F2F3EE",
                    base: "#D5F2C2",
                    "base-line": "#ABE585",
                    dark: "#BBDDC5",
                    "dark-line": "#99CCA8",
                    chill: "#C4ECC9",
                    "chill-line": "#92DC9C",
                },
                yellow: {
                    base: "#ECFAB6",
                    "base-line": "#DCE8A9",
                },
                */
            },
            borderRadius: {
                DEFAULT: "1rem",
            },
            fontSize: {
                "title-jumbo": pxToRem(140),
                "headline-lg": pxToRem(80),
                "headline-md": pxToRem(70),
                "headline-base": pxToRem(50),
                "headline-s": pxToRem(40),
                "headline-xs": pxToRem(32),
                "lead-m": pxToRem(22),
            },
        },
    },
    plugins: [],
}
