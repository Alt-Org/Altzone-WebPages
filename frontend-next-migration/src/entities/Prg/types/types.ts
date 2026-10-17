// Directus data
export interface PrgPage {
    id: number;
    date_created: string;
    date_updated: string | null;
    status?: 'draft' | 'published' | 'archived' | null;
    hero_image: string | null;
    registry_info_fi: string | null;
    registry_info_en: string | null;
}

export interface PrgDocument {
    key: string | null; // e.g. action_plan, activity_report, bylaws
    date_created: string;
    date_updated: string | null;
    status?: 'draft' | 'published' | 'archived' | null;
    url: string | null;
}

export interface PrgBoardMemberDirectus {
    id: number;
    date_created: string;
    date_updated: string | null;
    status?: 'draft' | 'published' | 'archived' | null;
    name: string;
    job_title_fi: string | null;
    job_title_en: string | null;
    profession_fi: string | null;
    profession_en: string | null;
    image: string | null;
    sort: number | null;
}

export interface PrgDirectusSchema {
    prg_page: PrgPage;
    prg_documents: PrgDocument[];
    prg_board_members: PrgBoardMemberDirectus[];
}

// Mapped data, localized
export interface PrgBoardMember {
    name: string;
    jobTitle: string;
    profession: string;
    imageUrl?: string;
}

export interface PrgPageData {
    heroImageUrl?: string;
    documents: {
        actionPlanUrl?: string;
        activityReportUrl?: string;
        bylawsUrl?: string;
    };
    registryInfo?: string;
    boardMembers?: PrgBoardMember[];
}
