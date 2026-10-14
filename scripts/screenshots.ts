// Captures the screenshot shown on each pet project card.
//
//   bun run screenshots              all projects
//   bun run screenshots atlas map    only projects whose name or url contains one of the words
//
// Each project in src/assets/MyProjects.ts is opened in headless Chromium and saved as
// src/assets/projects/<slug>.png, where ProjectCard finds it by the project's name. Every site is shot with
// the same viewport, scale, color scheme, locale and time zone so the screenshots look alike; per-project
// tweaks (another url, clicks, a fake clock, phone frames, …) are in the project's `screenshot` field, see
// ProjectScreenshot.
//
// The images are committed, so building the site needs neither a browser nor the network.

import { mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { type BrowserContext, type BrowserContextOptions, chromium, devices, type Page } from "playwright"
import { MY_PROJECTS } from "@/assets/MyProjects"
import type { PetProject } from "@/types/PetProject"
import { slug } from "@/utils/slug"

const OUT_DIR = new URL("../src/assets/projects/", import.meta.url)
const VIEWPORT = { width: 1280, height: 800 }
// phone screens are rendered as on this device (412×839 CSS px) and shown in CSS phone frames
const PHONE = devices["Pixel 7"]
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

// saves the project's card image and returns its file name
async function capture(desktop: BrowserContext, phone: BrowserContext, project: PetProject): Promise<string> {
    const { name, screenshot = {} } = project
    // lossless: the build re-encodes the image anyway, and a lossy source bands in smooth gradients
    const file = `${slug(name)}.png`
    const path = fileURLToPath(new URL(file, OUT_DIR))
    const save = (page: Page) => page.screenshot({ path, type: "png" })

    if (screenshot.phoneScreens) {
        const delayMs = screenshot.delayMs ?? DEFAULT_DELAY_MS
        const shots = await withProjectPage(phone, project, async (page) => {
            const shots: Buffer[] = []
            for (const { taps = [] } of screenshot.phoneScreens ?? []) {
                for (const [x, y] of taps) await page.mouse.click(x, y)
                if (taps.length > 0) await page.waitForTimeout(delayMs)
                shots.push(await page.screenshot({ type: "png" }))
            }
            return shots
        })
        await withPage(desktop, async (page) => {
            await page.setContent(phoneScene(shots), { waitUntil: "load" })
            await save(page)
        })
    } else {
        await withProjectPage(desktop, project, save)
    }
    return file
}

// opens the project's page, gets it ready for the shot and hands it to `use`
function withProjectPage<T>(context: BrowserContext, project: PetProject, use: (page: Page) => Promise<T>): Promise<T> {
    const { href, screenshot = {} } = project
    const url = screenshot.url ?? href
    return withPage(context, async (page) => {
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
        return use(page)
    })
}

async function withPage<T>(context: BrowserContext, use: (page: Page) => Promise<T>): Promise<T> {
    const page = await context.newPage()
    try {
        return await use(page)
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

// a promo scene of phones showing the screens, front one first and the rest fanned out behind it to the left
function phoneScene(screens: Buffer[]): string {
    const phones = screens
        .map((png, i) => `<div class="phone" style="--i: ${i}; z-index: ${screens.length - i}">
            <img src="data:image/png;base64,${png.toString("base64")}">
        </div>`)
        .join("")
    return `<!doctype html>
        <style>
            body {
                margin: 0;
                height: 100vh;
                overflow: hidden;
                background:
                    radial-gradient(60% 70% at 72% 25%, rgb(74 110 210 / 0.35), transparent 70%),
                    radial-gradient(50% 60% at 15% 95%, rgb(130 90 210 / 0.22), transparent 70%),
                    #0a0e1a;
            }
            /* faint grain over the backdrop: the dark gradients only span a few dozen shades, which shows
               as bands unless they are dithered */
            body::before {
                content: "";
                position: fixed;
                inset: 0;
                z-index: 0;
                opacity: 0.06;
                background-image: url("data:image/svg+xml,${encodeURIComponent(
                    `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`,
                )}");
            }
            /* faint dot grid, strongest behind the phones and fading out towards the edges */
            body::after {
                content: "";
                position: fixed;
                inset: 0;
                z-index: 0;
                background-image: radial-gradient(rgb(255 255 255 / 0.09) 1px, transparent 1.5px);
                background-size: 22px 22px;
                mask-image: radial-gradient(70% 80% at 55% 45%, #000, transparent);
            }
            .phone {
                position: absolute;
                top: 56px;
                left: 50%;
                width: 330px;
                padding: 10px;
                border-radius: 46px;
                background: #05070b;
                /* metal rim, its dark outer edge and a soft drop shadow */
                box-shadow: 0 0 0 2px #2b3342, 0 0 0 3px #0d1118, 0 40px 80px rgb(0 0 0 / 0.55);
                transform-origin: bottom center;
                transform: translateX(calc(-50% + ${(screens.length - 1) * 150}px - var(--i) * 300px))
                    rotate(calc(var(--i) * -6deg)) scale(calc(1 - var(--i) * 0.06));
                filter: brightness(calc(1 - var(--i) * 0.25));
            }
            .phone img {
                display: block;
                width: 100%;
                border-radius: 36px;
            }
            /* punch-hole camera */
            .phone::after {
                content: "";
                position: absolute;
                top: 22px;
                left: calc(50% - 6px);
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #000;
                box-shadow: 0 0 0 2px #151a24;
            }
        </style>
        <body>${phones}</body>`
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

const shared: BrowserContextOptions = {
    colorScheme: "dark",
    locale: "en-GB",
    timezoneId: TIME_ZONE,
    reducedMotion: "reduce",
}
const browser = await chromium.launch()
const desktop = await browser.newContext({ ...shared, viewport: VIEWPORT, deviceScaleFactor: 1 })
const phone = await browser.newContext({ ...PHONE, ...shared })

let failed = 0
for (const project of projects) {
    console.log(`${project.name}: ${project.screenshot?.url ?? project.href}`)
    try {
        console.log(`  -> src/assets/projects/${await capture(desktop, phone, project)}`)
    } catch (error) {
        failed++
        console.error(`  failed: ${error instanceof Error ? error.message : error}`)
    }
}

await browser.close()
process.exit(failed ? 1 : 0)
