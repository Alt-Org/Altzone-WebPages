import type { PrgPage, PrgPageData, PrgBoardMemberDirectus, PrgDocument } from '../types/types';
import { envHelper } from '@/shared/const/envHelper';

/**
 * Maps the PRG page data to a more structured format.
 * @param prgPage The PRG page data.
 * @param prgDocuments The PRG documents.
 * @param prgBoardMembers The PRG board members.
 * @param lng The language.
 * @returns The mapped PRG page data.
 */
export const mapPrgPageData = (
    prgPage?: PrgPage,
    prgDocuments?: PrgDocument[],
    prgBoardMembers?: PrgBoardMemberDirectus[],
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
        imageUrl: member.image ? normalizedDirectusHost() + '/assets/' + member.image : undefined,
    }));

    return {
        heroImageUrl: prgPage?.hero_image
            ? normalizedDirectusHost() + '/assets/' + prgPage.hero_image
            : undefined,
        documents: {
            actionPlanUrl: documentsMap.action_plan || undefined,
            activityReportUrl: documentsMap.activity_report || undefined,
            bylawsUrl: documentsMap.bylaws || undefined,
        },
        registryInfo: prgPage?.[`registry_info_${lng}`] || prgPage?.registry_info_en || '',
        boardMembers: boardMembers && boardMembers.length > 0 ? boardMembers : undefined,
    };
};

// remove trailing slash from directusHost if present
const normalizedDirectusHost = () => {
    const directusHost = envHelper.directusHost || '';
    return directusHost.endsWith('/') ? directusHost.slice(0, -1) : directusHost;
};
