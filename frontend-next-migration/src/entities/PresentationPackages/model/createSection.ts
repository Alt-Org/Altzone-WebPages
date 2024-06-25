import {PresentationSection} from "../types";

export function createSection(prefix: string, index: number): PresentationSection {
    return {
        id: `section${index + 1}`,
        label: `${prefix}-title`,
        description: `${prefix}-description`
    };
}