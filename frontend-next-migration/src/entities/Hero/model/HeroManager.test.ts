import { HeroSlug } from '../types/hero';
import { HeroManager } from './HeroManager';
import { fetchAllHeroes, fetchHeroBySlug } from './heroApi';

jest.mock('./heroApi', () => ({
    fetchAllHeroes: jest.fn(),
    fetchHeroBySlug: jest.fn(),
}));

const mockedFetchAllHeroes = jest.mocked(fetchAllHeroes);
const mockedFetchHeroBySlug = jest.mocked(fetchHeroBySlug);

describe('HeroManager Directus fallback behavior', () => {
    const manager = () => new HeroManager((key) => key);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('does not use static heroes after a successful empty all-heroes response', async () => {
        mockedFetchAllHeroes.mockResolvedValue([]);

        await expect(manager().getAllHeroesFromDirectus()).resolves.toEqual([]);
    });

    it('does not use a static hero after a successful no-match slug response', async () => {
        mockedFetchHeroBySlug.mockResolvedValue(undefined);

        await expect(manager().getHeroBySlugAsync(HeroSlug.OVEREATER)).resolves.toBeUndefined();
    });

    it('uses static heroes after a failed Directus request', async () => {
        mockedFetchHeroBySlug.mockRejectedValue(new Error('network failure'));

        await expect(manager().getHeroBySlugAsync(HeroSlug.OVEREATER)).resolves.toEqual(
            manager().getHeroBySlug(HeroSlug.OVEREATER),
        );
    });
});
