import { createSection } from "../createSection";

/** use them in shared i18n json files **/
const i18nKeyPrefixes = [
    "demo", "implementation"
]

export const TeachingSections = i18nKeyPrefixes.map((key, index) => createSection(key, index));




