import type { PetProject } from "@/types/PetProject"

export const MY_PROJECTS: PetProject[] = [
    {
        name: "Dynasty Atlas",
        href: "https://atlas.lumikello.net",
        description: "Interactive atlas of European royal dynasties.",
        yearStart: 2026,
        technologies: ["TypeScript", "React", "Vercel"],
    },
    {
        name: "Onshape Knurl",
        href: "https://github.com/simon-lumikello/onshape-knurl",
        description: "Knurl custom feature for Onshape",
        yearStart: 2026,
        technologies: ["TypeScript", "Onshape FeatureScript"],
        screenshot: {
            url: "https://raw.githubusercontent.com/simon-lumikello/onshape-knurl/main/docs/images/showcase.png",
        },
    },
    {
        name: "Tag maker",
        href: "https://nimikyltti.lumikello.net",
        description: "Design 3D-printable tags for doors and mailboxes",
        yearStart: 2026,
        technologies: ["TypeScript", "Three.js", "Vercel"],
    },
    {
        name: "Family dashboard",
        href: "https://calendar.lumikello.net",
        description: "Google Calendar-based family dashboard",
        yearStart: 2026,
        technologies: ["TypeScript", "React", "Vercel"],
        screenshot: { steps: ["Got it", "Minimize radar"], time: "15:00" },
    },
    {
        name: "Weather clock",
        href: "https://weather.lumikello.net",
        description: "Ambient screen with clock, weather forecast and interactive weather map",
        yearStart: 2026,
        technologies: ["TypeScript", "Vercel"],
    },
    {
        name: "Weather map",
        href: "https://map.lumikello.net",
        description: "Weather map with pretty cloud visualization and a few hidden tricks",
        yearStart: 2026,
        technologies: ["TypeScript", "Vercel"],
        screenshot: {
            // Vantaa: the first suggestion is the city in Uusimaa
            steps: ["Settings", { type: "Vantaa", into: "Search location" }, "Vantaa", "Sheer", "Noon", "Apply"],
            delayMs: 6000,
        },
    },
    {
        name: "lumikello.net",
        href: "https://lumikello.net",
        description: "Personal website experimental landing page",
        yearStart: 2026,
        technologies: ["TypeScript", "Vercel"],
        screenshot: { colorScheme: "light" },
    },
    {
        name: "Jaksa! Jaksa!",
        href: "https://jaksajaksa.com",
        description: "No-nonsense gym workout planner and tracker",
        yearStart: 2026,
        technologies: ["Next.js", "Supabase", "Vercel"],
    },
    {
        name: "loma loma! for Android",
        href: "https://play.google.com/store/apps/details?id=one.loma.loma",
        hrefLabel: "Google Play",
        description: "The loma loma! flight finder Android app",
        yearStart: 2026,
        technologies: ["Flutter", "Android"],
        screenshot: {
            // the web app is the same Flutter build, so it stands in for the Android app
            url: "https://loma.one",
            delayMs: 3000,
            // the Deals tab in front, the search calendar behind it (taps hit the bottom navigation)
            phoneScreens: [{ taps: [[206, 797]] }, { taps: [[68, 797]] }],
        },
    },
    {
        name: "loma loma!",
        href: "https://loma.one",
        description: "Cheap flight finder and route explorer",
        yearStart: 2025,
        technologies: ["Flutter", "Vercel"],
    },
]
