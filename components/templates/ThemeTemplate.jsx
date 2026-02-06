import ThemeList from "../ThemeList"

export default function ThemeTemplate({ page = {} }) {
    const { articles, title } = page

    return <>{articles && <ThemeList title={title} articles={articles} />}</>
}
