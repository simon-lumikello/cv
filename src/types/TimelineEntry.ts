export interface TimelineEntry {
    yearStart: number
    yearEnd?: number
    ongoing?: boolean
    title: string
    description: string
    company: string
    location: string
    technologies: string[]
}