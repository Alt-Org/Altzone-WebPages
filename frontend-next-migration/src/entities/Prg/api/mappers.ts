import type { PrgPage, PrgDocuments, PrgBoardMembers, PrgPageData } from '../types/types';

export const mapPrgPageData = (
    prgPage?: PrgPage,
    prgDocuments?: PrgDocuments[],
    prgBoardMembers?: PrgBoardMembers[],
    lng: 'fi' | 'en' = 'en',
): PrgPageData => {
    const documentsMap: Record<string, string | null> = {
        action_plan: null,
        activity_report: null,
        bylaws: null,
    };

    prgDocuments?.forEach((doc) => {
        if (doc.key && documentsMap.hasOwnProperty(doc.key)) {
            documentsMap[doc.key] = doc.url;
        }
    });

    const boardMembers = prgBoardMembers?.map((member) => ({
        name: member.name,
        jobTitle: member[`job_title_${lng}`] || member.job_title_en || '',
        profession: member[`profession_${lng}`] || member.profession_en || '',
        imageUrl: member.image || undefined,
    }));

    return {
        heroImageUrl: prgPage?.hero_image || undefined,
        documents: {
            actionPlanUrl: documentsMap.action_plan || undefined,
            activityReportUrl: documentsMap.activity_report || undefined,
            bylawsUrl: documentsMap.bylaws || undefined,
        },
        registryInfo: prgPage?.[`registry_info_${lng}`] || prgPage?.registry_info_en || '',
        boardMembers: boardMembers && boardMembers.length > 0 ? boardMembers : undefined,
    };
};
