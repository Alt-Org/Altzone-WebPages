import {PresentationSection} from "../types";

/**
 * Creates a new presentation section.
 *
 * @param {string} prefix - The prefix for the section titles and descriptions.
 * @param {number} index - The index of the section.
 * @return {PresentationSection} - The newly created section.
 */
export function createSection(prefix: string, index: number): PresentationSection {
    return {
        id: `section${index + 1}`,
        label: `${prefix}-label`,
        description: `${prefix}-description`
    };
}