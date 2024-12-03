/**
 * This file contains TypeScript interfaces and types that represent the structure of various entities
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
    locale: string;
    logo?: string | { id: string } | null;
    name: string;
    task?: string;
    teams?: Team[];
    website?: string;
}

export interface Department {
    id: number;
    name: string;
    members: Member[];
}

export interface Team {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    members: Member[];
    departments: Department[];
}

export interface Error {
    message: string;
    error: string;
}

// Types for handling query responses
export type QueryFnResponse = SuccessResponse | ErrorResponse;

export type SuccessResponse = {
    data: Member[]; // Using the defined Member interface
};

export type ErrorResponse = {
    error: {
        status: number;
        data: {
            message: string;
        };
    };
};
