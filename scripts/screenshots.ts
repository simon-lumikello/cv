// Captures the screenshot shown on each pet project card.
//
//   bun run screenshots              all projects
//   bun run screenshots atlas map    only projects whose name or url contains one of the words
//
// Each project in src/assets/MyProjects.ts is opened in headless Chromium and saved as
// src/assets/projects/<slug>.jpg, where ProjectCard finds it by the project's name. Every site is shot with
// the same viewport, scale, color scheme, locale and time zone so the screenshots look alike; per-project
// tweaks (another url, clicks, a fake clock, …) are in the project's `screenshot` field, see ProjectScreenshot.
//
// The images are committed, so building the site needs neither a browser nor the network.

import { mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { type BrowserContext, chromium, type Page } from "playwright"
import { MY_PROJECTS } from "@/assets/MyProjects"
import type { PetProject } from "@/types/PetProject"
import { slug } from "@/utils/slug"

const OUT_DIR = new URL("../src/assets/projects/", import.meta.url)
const VIEWPORT = { width: 1280, height: 800 }
const TIME_ZONE = "Europe/Helsinki"
const DEFAULT_DELAY_MS = 1500
const IMAGE_URL = /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i

// projects that aren't scripted by hand, narrowed down by the words given on the command line
function selectProjects(words: string[]): PetProject[] {
    const filters = words.map((word) => word.toLowerCase())
    return MY_PROJECTS.filter(
        ({ name, href, screenshot }) =>
            !screenshot?.manual &&
            (filters.length === 0 || filters.some((word) => `${name} ${href}`.toLowerCase().includes(word))),
    )
}

async function capture(context: BrowserContext, { name, href, screenshot = {} }: PetProject): Promise<string> {
    const url = screenshot.url ?? href
    const file = `${slug(name)}.jpg`
    const page = await context.newPage()
    try {
        if (screenshot.colorScheme) await page.emulateMedia({ colorScheme: screenshot.colorScheme })
        // fixed Date.now() while timers keep running, so the page still loads and animates
        if (screenshot.time) await page.clock.setFixedTime(todayAt(screenshot.time))

        if (IMAGE_URL.test(url)) {
            await page.setContent(imagePage(url), { waitUntil: "load" })
        } else {
            await page.goto(url, { waitUntil: "load", timeout: 30_000 })
            // long-polling or streaming sites never go idle, so don't fail on this
            await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {})
        }

        await clickThrough(page, screenshot.clicks ?? [])
        await page.waitForTimeout(screenshot.delayMs ?? DEFAULT_DELAY_MS)
        await page.screenshot({ path: fileURLToPath(new URL(file, OUT_DIR)), type: "jpeg", quality: 85 })
        return file
    } finally {
        await page.close()
    }
}

async function clickThrough(page: Page, texts: string[]): Promise<void> {
    for (const text of texts) {
        // a button by its accessible name, or anything else (e.g. a radio label) by its exact text
        const target = page.getByRole("button", { name: text }).or(page.getByText(text, { exact: true })).first()
        await target.waitFor({ state: "visible", timeout: 10_000 })
        // force: animated pages (e.g. a live map) never count as "stable" for Playwright
        await target.click({ force: true })
        // let dialogs open and close
        await page.waitForTimeout(300)
    }
}

// a plain page showing just the image, on the browser's light or dark background
function imagePage(src: string): string {
    return `<body style="margin:0;height:100vh;display:grid;place-items:center;color-scheme:light dark;background:Canvas">
        <img src="${src}" style="max-width:88%;max-height:80%;object-fit:contain">
    </body>`
}

// "15:00" -> today at 15:00 in TIME_ZONE, whatever the time zone of this machine
function todayAt(hhmm: string): Date {
    const day = new Date().toLocaleDateString("sv-SE", { timeZone: TIME_ZONE }) // YYYY-MM-DD
    const guess = new Date(`${day}T${hhmm}:00Z`)
    const zoned = new Date(`${guess.toLocaleString("sv-SE", { timeZone: TIME_ZONE }).replace(" ", "T")}Z`)
    return new Date(guess.getTime() - (zoned.getTime() - guess.getTime()))
}

const projects = selectProjects(process.argv.slice(2))
await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    colorScheme: "dark",
    locale: "en-GB",
    timezoneId: TIME_ZONE,
    reducedMotion: "reduce",
})

let failed = 0
for (const project of projects) {
    console.log(`${project.name}: ${project.screenshot?.url ?? project.href}`)
    try {
        console.log(`  -> src/assets/projects/${await capture(context, project)}`)
    } catch (error) {
        failed++
        console.error(`  failed: ${error instanceof Error ? error.message : error}`)
    }
}

await browser.close()
process.exit(failed ? 1 : 0)
