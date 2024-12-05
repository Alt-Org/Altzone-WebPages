import { useServerTranslation } from '@/shared/i18n';
import { SetInfo } from '../types/set';
import { FurnitureManager } from './FurnitureManager';
import { types } from './initializeFurniture';

describe('FurnitureManager', () => {
    const manager = new FurnitureManager();
    const sets: Array<SetInfo> = manager.getAllFurnitureSets();

    it('should return set id within set info', () => {
        sets.map((set) => {
            const id: string | undefined = set.id;

            expect(id).toBeTruthy();
            if (!id) {
                return true;
            }
            expect(manager.getFurnitureSet(id).id).toBe(set.id);

            return true;
        });
    });

    it('should return correct error messages with invalid values', () => {
        let err;
        try {
            manager.getFurnitureSet('anonexistentsetthatdoesnotexist');
        } catch (error) {
            err = error;
        }

        expect(err).toBeTruthy();
    });

    it('should return pieces in only same category', () => {
        Object.entries(types).map((info) => {
            const type = info[1];

            const items = manager.getPiecesByCategory(type);
            items.map((item) => {
                expect(item.type).toBe(type);
                return true;
            });
            return true;
        });
    });
    it('should return correct info with search keywords', async () => {
        const testlanguages = {
            en: [
                'chair',
                'stoOl',
                'Table',
                'LaMP',
                'nonexistentitem',
                '2342873482734972384729837489',
            ],
            fi: ['tuoli', 'jakkara', 'pöytä', 'PöYtÄ', 'eiolemassa', 'aaaaaaaa'],
        };

        const promise = new Promise((completed) => {
            Object.entries(testlanguages).map(async (lang) => {
                const { t } = await useServerTranslation(lang[0], 'furnitureinfo');
                lang[1].map((keyword) => {
                    const results = manager.getPiecesByKeyword(keyword, t);

                    results.map((item) => {
                        const set = item.set;
                        if (!set) {
                            return true;
                        }
                        const name =
                            `${t(`${set.path}.name`)} ${t(`${set.path}.ITEMS.${item.path}.name`)}`.toLowerCase();
                        const match = name.search(keyword.toLowerCase());

                        expect(match).toBeGreaterThanOrEqual(0);
                        return true;
                    });
                    return true;
                });
                completed(true);
            });
        });

        await promise;
    });

    describe('should return set reference within piece info', () => {
        sets.map((set) => {
            const info: SetInfo = manager.getFurnitureSet(set.id);
            expect(info).toBeTruthy();
            if (!info) {
                return true;
            }

            it(set.id, () => {
                info.items.map((item) => {
                    const set = item.set;
                    expect(set).toBeTruthy();
                    if (!set) {
                        return true;
                    }

                    expect(info.id).toBe(set.id);
                    return true;
                });
            });

            return true;
        });
    });
});
