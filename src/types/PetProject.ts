interface PetProject {
    name: string
    href: string
    description: string
    yearStart: number

    // when not provided - treat this entry as single year instead of year range
    yearEnd?: number
}