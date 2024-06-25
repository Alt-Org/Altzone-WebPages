
export interface SectionData {
    title: string;
    description: string;
}

export type SectionMap = Record<string, SectionData>

export interface Section {
    id: string;
    label: string;
    description: string;
}