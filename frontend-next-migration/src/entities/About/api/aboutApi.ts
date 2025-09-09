import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, rest, readItems } from '@directus/sdk';
import { Member, Demographics } from '../model/types/types';

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

        const normalize = (input: unknown) =>
            String(input ?? '')
                .normalize('NFKD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/\s+/g, ' ')
                .trim()
                .toLowerCase();

        return new Set(
            members.map((member, index) =>
                normalize(member.name)
                    ? `name:${normalize(member.name)}`
                    : `__id_${member.id ?? index}`,
            ),
        ).size;
    } catch (error) {
        console.error('fetchMembersServer error:', error);
        throw error;
    }
}

/**
 * Fetches demographics data from Directus.
 * Returns the localities and nationalities counts from the latest record.
 * Uses a cacheBuster query parameter to prevent cached responses and ensure the latest value is retrieved from the database.
 *
 * @returns {Promise<{localities: number, nationalities: number}>} Demographics counts.
 * @throws {Error} On API request failure.
 */

export async function fetchDemographicsServer(): Promise<{
    localities: number;
    nationalities: number;
}> {
    try {
        const cacheBuster = Date.now();
        const demographics = await client.request<Demographics[]>(
            readItems('demographics', {
                filter: { status: { _neq: 'archived' } },
                limit: 1,
                cacheBuster,
            }),
        );

        if (!demographics.length) {
            return { localities: 0, nationalities: 0 };
        }

        const { localities = 0, nationalities = 0 } = demographics[0];

        return {
            localities,
            nationalities,
        };
    } catch (error) {
        console.error('fetchDemographicsServer error:', error);
        throw error;
    }
}
