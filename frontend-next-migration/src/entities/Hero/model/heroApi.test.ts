import { HeroGroup, HeroSlug } from '../types/hero';
import { groupHeroesByGroup } from './groupHeroesByGroup';
import { fetchAllHeroes, fetchHeroBySlug } from './heroApi';

jest.mock('@/shared/const/envHelper', () => ({
    envHelper: { directusHost: 'https://directus.test' },
}));

const publishedHero = {
    id: 1,
    slug: HeroSlug.OVEREATER,
    status: 'Published',
    order: 1,
    translations: [
        {
            languages_code: 'en-US',
            title: 'Overeater',
            description: 'Published hero',
            alt: 'Overeater',
            altGif: 'Overeater animated',
        },
    ],
    group: {
        key: HeroGroup.RETROFLECTOR,
        bgColour: '#000',
        translations: [{ languages_code: 'en-US', name: 'Retroflector', description: 'Group' }],
    },
    heroes_stats: [],
};

const response = (data: unknown) =>
    ({
        ok: true,
        json: async () => ({ data }),
        text: async () => JSON.stringify({ data }),
    }) as Response;

describe('heroApi status gating', () => {
    let fetchMock: jest.SpiedFunction<typeof fetch>;

    beforeEach(() => {
        fetchMock = jest.spyOn(globalThis, 'fetch');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it.each(['Draft', 'Archived'])('does not return a %s hero by slug', async (status) => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        fetchMock.mockImplementation(async (input) => {
            const url = new URL(String(input));
            expect(url.searchParams.get('filter[status][_eq]')).toBe('Published');
            return response([{ ...publishedHero, status }]);
        });

        await expect(fetchHeroBySlug('draft-hero' as HeroSlug)).resolves.toBeUndefined();
        expect(warn.mock.calls).toEqual([
            [
                '[fetchHeroBySlug] No hero found in Directus for slug "draft-hero" (response had 1 items)',
            ],
        ]);
    });

    it('returns only the published heroes from the all-heroes request', async () => {
        fetchMock.mockImplementation(async (input) => {
            const url = new URL(String(input));
            expect(url.searchParams.get('filter[status][_eq]')).toBe('Published');
            return response([publishedHero]);
        });

        const heroes = await fetchAllHeroes();

        expect(heroes).toHaveLength(1);
        expect(heroes[0].slug).toBe(HeroSlug.OVEREATER);
    });

    it('keeps a successful empty all-heroes response empty', async () => {
        fetchMock.mockResolvedValue(response([]));

        await expect(fetchAllHeroes()).resolves.toEqual([]);
    });

    it('rejects when the all-heroes request fails', async () => {
        const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const logError = jest.spyOn(console, 'error').mockImplementation(() => {});
        fetchMock.mockResolvedValue({ ok: false, status: 503, text: async () => '' } as Response);

        await expect(fetchAllHeroes()).rejects.toThrow('Directus request failed with status 503');
        expect(warn.mock.calls).toEqual([['[fetchAllHeroes] Directus error 503: ']]);
        expect(logError.mock.calls).toEqual([
            ['[fetchAllHeroes] ✗ Fetch error:', 'Directus request failed with status 503'],
        ]);
    });

    it('groups the published heroes returned by the filtered request', async () => {
        fetchMock.mockImplementation(async (input) => {
            const url = new URL(String(input));
            expect(url.searchParams.get('filter[status][_eq]')).toBe('Published');
            return response([publishedHero]);
        });

        const heroes = await fetchAllHeroes();
        const result = groupHeroesByGroup(heroes);

        expect(result[HeroGroup.RETROFLECTOR].heroes).toHaveLength(1);
        expect(result[HeroGroup.RETROFLECTOR].heroes[0].slug).toBe(HeroSlug.OVEREATER);
    });
});
