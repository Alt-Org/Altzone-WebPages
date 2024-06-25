import {Section, SectionMap } from "../types";

export function createDynamicSectionsWithI18(
    data: SectionMap,
    t: (key: string) => string,
): Section[] {
    return Object.entries(data).map(([_, value], index) => ({
        id: `section${index + 1}`,
        label: t(value.title),
        description: t(value.description)
    }));
}