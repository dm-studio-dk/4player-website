import page from "./page"
import person from "./person"
import header from "./header"
import siteSettings from "./siteSettings"
import article from "./article"
import theme from "./theme"
import guide from "./guide"
import footer from "./footer"
import reusableModule from "./reusableModule"
import initiative from "./initiative"
import newsSettings from "./newsSettings"
import history from "./history"
import redirect from "./redirect"

export default [
    // Settings
    siteSettings,
    newsSettings,
    header,
    footer,
    redirect,
    // Reusable Modules
    reusableModule,
    // Content
    page,
    person,
    article,
    theme,
    guide,
    initiative,
    history,
]
