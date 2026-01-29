export interface Logo {
    url: string;
}

export interface Asset {
    id: string;
    title: string;
}

export interface Member {
    id: number;
    name: string;
    email?: string;
    logo?: Logo | null;
    website?: string;
    github?: string | null;
    linkedin?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    language?: string;
    roles?: MemberRole[];
    portrait?: Asset | null;
}

export interface MemberRole {
    id: number;
    team?: Team | null;
    department?: Department | null;
    translations?: RoleTranslation[];
}

export interface Department {
    id: number;
    name: string;
    translations: DepartmentTranslation[];
    members: Member[];
}

export interface Team {
    name: string;
    id: number;
    translations: TeamTranslation[];
    members: Member[];
    departments: Department[];
}

export interface DepartmentTranslation {
    id: number;
    departments_v2_id: number;
    languages_code: string;
    name: string;
}

export interface TeamTranslation {
    id: number;
    teams_v2_id: number;
    languages_code: string;
    name: string;
}

export interface Translation {
    id: number;
    members_id: number;
    languages_code: string;
    task?: string;
}

export interface RoleTranslation {
    id: number;
    members_roles_id: number;
    languages_code: string;
    task?: string;
}
