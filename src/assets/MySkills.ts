import type { SkillGroup } from "@/types/SkillGroup"
import { Activity, Server, Monitor, FlaskConical, Workflow, Database, Rocket, ListChecks, Smartphone } from "@lucide/astro"

export const MY_SKILLS: SkillGroup[] = [
    
    {
        title: "Frontend",
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
                href: "https://www.electronjs.org/",
                title: "Electron",
            },
            { href: "https://bun.com/", title: "Bun" },
            { href: "https://vite.dev/", title: "Vite" },
            { href: "https://docs.oracle.com/javase/tutorial/uiswing/", title: "Java Swing" },
        ],
    },
    {
        title: "Backend",
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
            { href: "https://learn.microsoft.com/aspnet/core/signalr/introduction", title: "SignalR" },
            { href: "https://www.php.net/", title: "PHP" },
        ],
    },
    {
        title: "Testing",
        icon: FlaskConical,
        items: [
            {
                href: "https://playwright.dev/",
                title: "Playwright",
            },
            { href: "https://www.cypress.io/", title: "Cypress" },
        ],
    },
    {
        title: "Databases",
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
        title: "CI/CD",
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
        title: "Infrastructure",
        icon: Rocket,
        items: [
            { href: "https://canonical.com/maas", title: "MAAS" },
            { href: "https://developer.hashicorp.com/packer", title: "Packer" }
        ],
    },
    {
        title: "Team tools",
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
        title: "Mobile",
        icon: Smartphone,
        items: [
            { href: "https://flutter.dev/", title: "Flutter" },
            { href: "https://reactnative.dev/", title: "React Native" },
        ],
    },
    {
        title: "Leadership",
        icon: Activity,
        items: [
            { title: "Process and workflow design" },
            { title: "Roadmapping" },
            { title: "Code reviews" },
            { title: "Field support" },
            { title: "Hiring & mentoring" },
        ],
    },
]
