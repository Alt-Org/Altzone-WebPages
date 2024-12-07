export interface Logo {
    url: string;
}

export interface Member {
    id: number;
    name: string;
    task?: string;
    email?: string;
    logo?: Logo | null;
    website?: string;
    github?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    language?: string;
    department?: Department | null;
    team?: Team | null;
    translations?: Translation[];
    userCreated?: string;
    userUpdated?: string;
    status: string;
}

export interface Department {
    id: number;
    name: string;
    date_created: string;
    date_updated: string;
    status: string;
    translations: DepartmentTranslation[];
    members: Member[];
}

export interface Team {
    name: string;
    id: number;
    date_created: string;
    date_updated: string;
    status: string;
    translations: TeamTranslation[];
    members: Member[];
    departments: Department[];
}

export interface DepartmentTranslation {
    id: number;
    departments_id: number;
    languages_code: string;
    department: string;
}

export interface TeamTranslation {
    id: number;
    teams_id: number;
    languages_code: string;
    team: string;
}

export interface Translation {
    id: number;
    members_id: number;
    languages_code: string;
    task?: string;
}
