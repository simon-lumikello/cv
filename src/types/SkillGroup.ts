import type { Skill } from "@/types/Skill"
import type { AstroComponent } from "@lucide/astro"

export interface SkillGroup {
    icon: AstroComponent
    items: Skill[]
}
