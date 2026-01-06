export interface TimelineEntry {
    yearStart: number

    // when not provided - treat this entry as single year instead of year range
    yearEnd?: number

    // when true - the end year will be automatically rendered as current year
    ongoing?: boolean
    title: string
    description: string
    company: string
    location: string
    technologies: string[]

    // when true - page break div will be inserted before this entry
    // this may be helpful when optimizing the printable view
    pageBreak?: boolean
}
