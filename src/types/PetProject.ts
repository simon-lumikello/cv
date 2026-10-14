export interface PetProject {
    name: string
    href: string
    // shown for the link instead of the shortened href, e.g. "Google Play" for a store listing
    hrefLabel?: string
    description: string
    yearStart: number

    // when not provided - treat this entry as single year instead of year range
    yearEnd?: number

    technologies?: string[]

    screenshot?: ProjectScreenshot
}

// Per-project tweaks for `bun run screenshots` (scripts/screenshots.ts), which saves the card image as
// src/assets/projects/<slug>.png. Without any, the project's href is shot as is.
export interface ProjectScreenshot {
    // page to capture instead of href; an image url (.png, .jpg, …) is centered on a plain page,
    // for projects without a web page of their own
    url?: string

    // buttons or options to click in order before the shot, by their accessible name or exact text,
    // e.g. to close a welcome dialog or to pick settings
    clicks?: string[]

    // wait before the shot, after the page has loaded and the clicks are done, for animations, maps and
    // data fetching; 1500 ms by default
    delayMs?: number

    // preferred color scheme to render the site in; dark by default
    colorScheme?: "light" | "dark"

    // fake wall clock for the page, "HH:MM" today in Helsinki, e.g. for clocks and timelines
    time?: string

    // show the page as a mobile app: it is rendered at phone size and each entry becomes one phone in a
    // promo scene, front first; the screens are taken one after another on the same page
    phoneScreens?: PhoneScreen[]

    // the image is maintained by hand, the script leaves it alone
    manual?: boolean
}

export interface PhoneScreen {
    // points to tap before taking this screen, in CSS pixels of the 412×839 phone viewport; for apps drawn
    // on a canvas (e.g. Flutter web), which have no text to click by
    taps?: [x: number, y: number][]
}
