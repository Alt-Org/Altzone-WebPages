import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { Member } from '../model/types/types';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

/**
 * Returns the count of unique members from Directus.
 * Uniqueness is based on normalized names; falls back to ID if name is missing.
 * Fetches up to 500 members per call.
 *
 * @returns {Promise<number>} Unique member count.
 * @throws {Error} On API request failure.
 */

export async function fetchMembersServer(): Promise<number> {
    try {
        const members = await client.request<Member[]>(readItems('members', { limit: 500 }));

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
