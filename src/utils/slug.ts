// "Jaksa! Jaksa!" -> "jaksa-jaksa", "lumikello.net" -> "lumikello-net"
export function slug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
}
