import type { SkillGroup } from "@/types/SkillGroup"
import { Activity, Server, Monitor, Workflow, Database, Rocket, ListChecks, Ghost } from "@lucide/astro"

export const MY_SKILLS: SkillGroup[] = [
    {
        icon: Activity,
        items: [
            { title: "Mentoring" },
            { title: "Roadmapping" },
            { title: "Solution design" },
            { title: "Code reviews" },
            { title: "Field support" },
        ],
    },
    {
        icon: Server,
        items: [
            {
                href: "https://dotnet.microsoft.com/",
                title: ".NET",
            },
            {
                href: "https://dotnet.microsoft.com/en-us/languages/csharp",
                title: "C#",
            },
            {
                href: "https://dotnet.microsoft.com/en-us/apps/aspnet",
                title: "ASP.NET",
            },
            { href: "https://www.openapis.org/", title: "OpenAPI" },
            { href: "https://github.com/SignalR/SignalR", title: "SignalR" },
        ],
    },
    {
        icon: Monitor,
        items: [
            {
                href: "https://www.typescriptlang.org/",
                title: "TypeScript",
            },
            { href: "https://react.dev/", title: "React" },
            { href: "https://nextjs.org/", title: "Next.js" },
            {
                href: "https://plotly.com/javascript/",
                title: "Plotly.js",
            },

            {
                href: "https://playwright.dev/",
                title: "Playwright",
            },
            { href: "https://www.cypress.io/", title: "Cypress" },
            {
                href: "https://www.electronjs.org/",
                title: "Electron",
            },
            { href: "https://bun.com/", title: "Bun" },
            { href: "https://vite.dev/", title: "Vite" },
        ],
    },
    {
        icon: Workflow,
        items: [
            { href: "https://www.jenkins.io/", title: "Jenkins" },
            {
                href: "https://www.jetbrains.com/teamcity/",
                title: "TeamCity",
            },
            { href: "https://vercel.com/", title: "Vercel" },
        ],
    },
    {
        icon: Database,
        items: [
            {
                href: "https://www.microsoft.com/en-us/sql-server",
                title: "MSSQL",
            },
            { href: "https://sqlite.org/", title: "SQLite" },
            { href: "https://supabase.com/", title: "Supabase" },
        ],
    },
    {
        icon: Rocket,
        items: [
            { href: "https://canonical.com/maas", title: "MAAS" },
            { href: "https://ubuntu.com/server", title: "Ubuntu" },
        ],
    },
    {
        icon: ListChecks,
        items: [
            {
                href: "https://www.atlassian.com/software/jira",
                title: "Jira",
            },
            {
                href: "https://bitbucket.org/product/",
                title: "Bitbucket",
            },
            {
                href: "https://www.atlassian.com/software/confluence",
                title: "Confluence",
            },
        ],
    },
    {
        icon: Ghost,
        items: [
            { href: "https://www.java.com/", title: "Java" },
            { href: "https://flutter.dev/", title: "Flutter" },
            { href: "https://www.php.net/", title: "PHP" },
        ],
    },
]