// what changed compared to the previous role at the same company
export type RoleChange = "promotion" | "responsibility"

export interface TimelineRole {
    yearStart: number

    // when not provided - treat this role as single year instead of year range
    yearEnd?: number

    // when true - the end year will be automatically rendered as current year
    ongoing?: boolean
    title: string
    location: string
    description: string

    // omitted for the first role at a company
    change?: RoleChange

    // the first role at a company lists its full stack,
    // later roles list only the technologies not already listed for an earlier role
    technologies?: string[]
}

export interface TimelineEntry {
    company: string

    // e.g. the company's former name
    companyNote?: string

    // newest first
    roles: TimelineRole[]
}
