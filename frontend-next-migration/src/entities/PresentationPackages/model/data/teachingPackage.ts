import { PresentationSection} from "../../types";

/** use them in shared i18n json files **/
const i18nKeyPrefixes = [
    "demo", "implementation"
]

export const TeachingSections = i18nKeyPrefixes.map(createSection);


function createSection(prefix: string, index: number): PresentationSection {
    return {
        id: `section${index + 1}`,
        label: `${prefix}-title`,
        description: `${prefix}-description`
    };
}
