// "https://www.example.com/" -> "example.com"
export function displayUrl(href: string): string {
    return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}
