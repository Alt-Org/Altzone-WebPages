import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { PrgPage, PrgDocuments, PrgBoardMembers } from '../types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

const directusBaseUrl = envHelper.directusHost || '';
const client = createDirectus(directusBaseUrl).with(rest());

const errorHandler = (error: unknown): FetchBaseQueryError => {
    const status =
        typeof error === 'object' &&
        error !== null &&
        'status' in error &&
        typeof error.status === 'number'
            ? error.status
            : 500;
    const message = error instanceof Error ? error.message : 'Data fetch failed';
    return {
        status,
        data: { message: message },
    };
};

const prgPageApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getPrgPage: builder.query({
            queryFn: async (
                _arg: void,
            ): Promise<{ data: PrgPage[] } | { error: FetchBaseQueryError }> => {
                try {
                    const prgPage = await client.request(
                        readItems('prg_page', { fields: ['*'], limit: 1 }),
                    );
                    return { data: prgPage as PrgPage[] };
                } catch (error: unknown) {
                    return { error: errorHandler(error) };
                }
            },
        }),
        getPrgDocuments: builder.query<PrgDocuments[], void>({
            queryFn: async (): Promise<
                { data: PrgDocuments[] } | { error: FetchBaseQueryError }
            > => {
                try {
                    const prgDocuments = await client.request(
                        readItems('prg_documents', { fields: ['*'] }),
                    );
                    return { data: prgDocuments as PrgDocuments[] };
                } catch (error) {
                    return { error: errorHandler(error) };
                }
            },
        }),
        getPrgBoardMembers: builder.query<PrgBoardMembers[], void>({
            queryFn: async (): Promise<
                { data: PrgBoardMembers[] } | { error: FetchBaseQueryError }
            > => {
                try {
                    const prgBoardMembers = await client.request(
                        readItems('prg_board_members', { fields: ['*'] }),
                    );
                    return { data: prgBoardMembers as PrgBoardMembers[] };
                } catch (error) {
                    return { error: errorHandler(error) };
                }
            },
        }),
    }),
});

export const { useGetPrgPageQuery, useGetPrgDocumentsQuery, useGetPrgBoardMembersQuery } =
    prgPageApi;
