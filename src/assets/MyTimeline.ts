import type { TimelineEntry } from "@/types/TimelineEntry"

export const MY_TIMELINE_ENTRIES: TimelineEntry[] = [
    {
        company: "Valmet Automation",
        companyNote: "formerly Metso Automation",
        roles: [
            {
                yearStart: 2024,
                yearEnd: 2026,
                title: "Chief software design engineer",
                location: "Jyväskylä",
                change: "promotion",
                description: "In addition to building new UI features and maintaining the codebase, I work on team-wide workflows and tools, hiring and mentoring new team members and integrating AI workflows into our development process.",
                technologies: ["Kiro", "Rovo"],
            },
            {
                yearStart: 2023,
                yearEnd: 2024,
                title: "Senior software design engineer",
                location: "Jyväskylä",
                change: "promotion",
                technologies: ["Playwright", "MAAS"],
                description: `
As the product started shipping to customers,
I took responsibility for handling feedback from the field: fixing issues,
implementing new feature requests, and supporting project engineers working onsite.
                `,
            },
            {
                yearStart: 2020,
                yearEnd: 2023,
                title: "Software design engineer",
                location: "Jyväskylä",
                description: `
I proposed a replacement for the outdated UI. Once it was approved, I took charge of the project.
I handled prioritization, interacted with the product group, and gathered customer feedback, all while leading a small team and writing code as the lead developer.
                `,
                technologies: [
                    "TypeScript",
                    "OpenAPI/Swagger",
                    "Plotly.js",
                    "Electron",
                    "Material UI",
                    "SQLite",
                    "Bitbucket",
                    "Git",
                    "Linux",
                ],
            },
            {
                yearStart: 2017,
                yearEnd: 2019,
                title: "Software design engineer",
                location: "Tampere",
                description: `
Moved to Tampere to focus on research tasks.
Investigated new technologies, pitched feature improvements, and developed functional prototypes.
                `,
                technologies: [
                    "Node.js",
                    "React",
                    "Vue",
                    "Semantic UI",
                    "ASP.NET Core",
                    "npm",
                    "yarn",
                    "Webpack",
                    "Jest",
                    "Docker",
                    "Cypress",
                ],
            },
            {
                yearStart: 2012,
                yearEnd: 2017,
                title: "Software design engineer",
                location: "Jyväskylä",
                description: `
Continued development of the Metso PQV user interface after being hired directly by Metso Automation in Jyväskylä.
                `,
                technologies: [
                    "Java",
                    ".NET",
                    "C#",
                    "PHP",
                    "JavaScript",
                    "MSSQL",
                    "SVN",
                    "Jira",
                    "Confluence",
                    "Jenkins",
                ],
            },
        ],
    },
    {
        company: "PetrSU IT park",
        roles: [
            {
                yearStart: 2010,
                yearEnd: 2012,
                title: "Software developer",
                location: "Petrozavodsk",
                description: `
Worked as a subcontractor for Metso Automation, maintaining and improving the user interface for the Metso PQV system.
                `,
                technologies: ["Java", "C#", "PHP", "JavaScript", "MSSQL", "SVN"],
            },
        ],
    },
    {
        company: "Freelance",
        roles: [
            {
                yearStart: 2005,
                yearEnd: 2010,
                title: "Freelance web developer",
                location: "Petrozavodsk",
                description: `
Worked as a freelance web developer & graphic designer. Projects ranged from simple static websites to large portals with an established user base.
                `,
                technologies: ["HTML", "CSS", "PHP", "JavaScript", "MySQL"],
            },
        ],
    },
]
