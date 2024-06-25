import {PresentationSection} from "@/entities/PresentationPackages/types";
import {TeachingSections} from "./data/teachingPackage";

const makeSectionsWithI18n = (sections: PresentationSection[]): ((t: (key: string) => string) => PresentationSection[]) => {
    return (t: (key: string) => string): PresentationSection[] => {
        return sections.map(section => ({
            ...section,
            label: t(section.label),
            description: t(section.description)
        }));
    };
};

export const makeTeachingSectionsWithI18n =  makeSectionsWithI18n(TeachingSections);
