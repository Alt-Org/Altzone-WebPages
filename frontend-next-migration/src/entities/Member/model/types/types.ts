/**
 * This file contains TypeScript interfaces and types representing the structure of various entities
 * used throughout the application, such as Member, Department, Team, Logo, and error handling structures.
 */

export interface Logo {
    data: {
        attributes: {
            url: string;
        };
    } | null;
}

export interface Member {
    departments?: Department[];
    email?: string;
    facebook?: string;
    github?: string;
    id: number;
    instagram?: string;
    linkedin?: string;
    language: string;
    logo?: string | { id: string } | null;
    name: string;
    task?: string;
    teams?: Team[];
    translations?: Translation[];
    website?: string;
}

export interface Translation {
    translation: string;
    id: number;
    departments_id: number;
    languages_code: string;
    department: string;
    task: string;
    website: string;
    facebook: string;
    linkedin: string;
    instagram: string;
    github: string;
    find: string;
}

export interface Department {
    id: number;
    name?: string;
    translations: Translation[];
    members?: Member[];
}

export interface Team {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    members?: Member[]; // Members may be an optional field
    departments?: Department[]; // Departments might be optional and separately loaded
}

export interface Error {
    message: string;
    error: string;
}

// Types for handling query responses
export type QueryFnResponse = SuccessResponse | ErrorResponse;

export type SuccessResponse = {
    data: Member[] | Department[]; // Generalize to allow department data
};

export type ErrorResponse = {
    error: {
        status: number;
        data: {
            message: string;
        };
    };
};
