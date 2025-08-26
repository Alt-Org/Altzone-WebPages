import { directusApi } from '@/shared/api';
import { Member } from '../model/types/types';
import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

const membersApi = directusApi.injectEndpoints({
    endpoints: (builder) => ({
        getMembers: builder.query<Member[], void>({
            queryFn: async (): Promise<{ data: Member[] } | { error: FetchBaseQueryError }> => {
                try {
                    const members = await client.request<Record<string, any>[]>(
                        readItems('members', {
                            fields: [
                                '*',
                                'department.*',
                                'department.translations.*',
                                'team.*',
                                'team.translations.*',
                                'translations.*',
                                'logo.*',
                            ],
                            limit: 500,
                        }),
                    );
                    return { data: members as Member[] };
                } catch (error: any) {
                    return {
                        error: {
                            status: error.status || 500,
                            data: { message: error.message || 'Data fetch failed' } as any,
                        },
                    };
                }
            },
        }),
    }),
});

export const { useGetMembersQuery } = membersApi;

export async function fetchMembersServer(): Promise<number> {
    try {
        const members = await client.request<any[]>(readItems('members', { limit: 500 }));

        const normalize = (s: unknown) =>
            String(s ?? '')
                .normalize('NFKD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, ' ')
                .trim()
                .toLowerCase();

        return new Set(
            members.map((m, i) =>
                normalize(m.name) ? `name:${normalize(m.name)}` : `__id_${m.id ?? i}`,
            ),
        ).size;
    } catch (error) {
        console.error('fetchMembersServer error:', error);
        throw error;
    }
}
