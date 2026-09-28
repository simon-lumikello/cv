import type { TimelineRole } from "@/types/TimelineEntry"

// "2019–2023", or a single year when there is no end year;
// ongoing ranges end with the current year
export function formatYears(yearStart: number, yearEnd?: number, ongoing?: boolean): string {
    const end = ongoing ? new Date().getFullYear() : yearEnd
    return end ? `${yearStart}–${end}` : `${yearStart}`
}

// the whole span of a company's roles, which are ordered newest first
export function formatRolesYears(roles: TimelineRole[]): string {
    const latest = roles[0]
    const earliest = roles[roles.length - 1]
    return formatYears(earliest.yearStart, latest.yearEnd, latest.ongoing)
}
