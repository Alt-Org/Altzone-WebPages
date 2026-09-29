// Directus data
export interface PrgPage {
    id: number;
    created_at: string;
    updated_at: string;
    status?: 'draft' | 'published' | 'archived' | null;
    hero_image?: string | null;
    registry_info_fi: string | null;
    registry_info_en: string | null;
}

export interface PrgDocuments {
    key: string | null; // e.g. action_plan, activity_report, bylaws
    created_at: string;
    updated_at: string;
    status?: 'draft' | 'published' | 'archived' | null;
    url: string | null;
}

export interface PrgBoardMembers {
    id: number;
    created_at: string;
    updated_at: string;
    status?: 'draft' | 'published' | 'archived' | null;
    name: string;
    job_title_fi: string | null;
    job_title_en: string | null;
    profession_fi: string | null;
    profession_en: string | null;
    image: string | null;
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
