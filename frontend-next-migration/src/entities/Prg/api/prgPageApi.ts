import { directusApi } from '@/shared/api';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';
import { PrgPage, PrgDocument, PrgBoardMemberDirectus, PrgDirectusSchema } from '../types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query/react';

const directusBaseUrl = envHelper.directusHost || '';
const client = createDirectus<PrgDirectusSchema>(directusBaseUrl).with(rest());

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

/**
 * Fetches the PRG page data from Directus, including the PRG page hero image and registroy info, document links, and board members.
 *
 * @returns An object containing the PRG page data, loading state, and any error that occurred during the fetch.
 */
const prgPageApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getPrgPage: builder.query({
            queryFn: async (
                _arg: void,
            ): Promise<{ data: PrgPage } | { error: FetchBaseQueryError }> => {
                try {
                    const prgPage = await client.request(
                        readSingleton('prg_page', { fields: ['*'] }),
                    );
                    return { data: prgPage };
                } catch (error: unknown) {
                    return { error: errorHandler(error) };
                }
            },
        }),
        getPrgDocuments: builder.query<PrgDocument[], void>({
            queryFn: async (): Promise<
                { data: PrgDocument[] } | { error: FetchBaseQueryError }
            > => {
                try {
                    const prgDocuments = await client.request(
                        readItems('prg_documents', { fields: ['*'] }),
                    );
                    return { data: prgDocuments };
                } catch (error) {
                    return { error: errorHandler(error) };
                }
            },
        }),
        getPrgBoardMembers: builder.query<PrgBoardMemberDirectus[], void>({
            queryFn: async (): Promise<
                { data: PrgBoardMemberDirectus[] } | { error: FetchBaseQueryError }
            > => {
                try {
                    const prgBoardMembers = await client.request(
                        readItems('prg_board_members', {
                            fields: ['*'],
                            sort: ['sort', 'id'],
                        }),
                    );
                    return { data: prgBoardMembers };
                } catch (error) {
                    return { error: errorHandler(error) };
                }
            },
        }),
    }),
});

export const { useGetPrgPageQuery, useGetPrgDocumentsQuery, useGetPrgBoardMembersQuery } =
    prgPageApi;
