import { TFunction } from 'i18next';
import {
    FurnitureSet,
    SetInfo,
    Piece,
    PieceType,
    SetTranslation,
    PieceTranslation,
    MaterialTranslation,
} from '../types/furniture';
import { initializeFurnitureSets } from './initializeFurniture';
import { $SpecialObject } from 'i18next/typescript/helpers';

const enums: Record<string, FurnitureSet> = {
    neuro: FurnitureSet.NEURO,
    taakka: FurnitureSet.TAAKKA,
    rakkaus: FurnitureSet.RAKKAUS,
    muistoja: FurnitureSet.MUISTOJA,
};

/**
 * Class for handling furniture sets and regarding methods
 */
export class FurnitureManager {
    private readonly furnitureSets: Record<FurnitureSet, SetInfo>;

    constructor() {
        this.furnitureSets = initializeFurnitureSets();
    }

    /**
     * Returns the translation object for a furniture set.
     *
     * @param {TFunction} t Translator function. Must be set to 'furnitureinfo'
     * @param {string} path The translation path to look for. Use 'SetInfo.path'.
     * @returns {SetTranslation} Translation info for the set.
     */
    public getSetTranslation(t: TFunction, path: string): SetTranslation | string {
        const raw: $SpecialObject | string = t(path, { returnObjects: true });

        if (typeof raw === 'string') {
            return t('set-translation-missing-raw-data');
        }
        if (
            !('name' in raw) ||
            typeof raw.name !== 'string' ||
            !('items' in raw) ||
            typeof raw.items !== 'object' ||
            !raw.items
        ) {
            return t('set-translation-missing-raw-properties');
        }
        const items: Record<string, PieceTranslation> = {};
        Object.entries(raw.items).map((index) => {
            const key = index[0];

            if (typeof key !== 'string') {
                return t('set-translation-invalid-key');
            }

            const value = index[1];

            if (
                typeof value !== 'object' ||
                !('name' in value) ||
                typeof value.name !== 'string' ||
                !('desc' in value) ||
                typeof value.desc !== 'string'
            ) {
                return t('set-translation-missing-properties');
            }

            items[key] = { name: value.name, desc: value.desc };
            return true;
        });

        return {
            name: raw.name,
            items: items,
            unknown: {
                name: t('piece-translation-unknown-item'),
                desc: t('piece-translation-unknown-item'),
            },
        };
    }

    /**
     * Returns the translation object for a piece within a furniture set.
     *
     * @param {SetTranslation} t Translations object. Use 'getSetTranslation' to get it.
     * @param {string} path Translation path within set. Use 'Piece.path'.
     * @returns {PieceTranslation} an object containing the translated name and description for a piece.
     */
    public getPieceTranslation(t: SetTranslation | string, path: string): PieceTranslation {
        if (typeof t === 'string') {
            return { name: t, desc: t };
        }
        const raw: PieceTranslation | undefined = t.items[path];

        if (!raw) {
            return t.unknown;
        }

        return raw;
    }

    /**
     * Returns a furniture set with the items sorted in ascending order by rarity.
     *
     * @param {string} id The id of the furniture set
     * @throws {Error} Throws an error if the set does not exist
     * @returns {SetInfo} Returns a single set
     */
    public getFurnitureSet(id: string): SetInfo | null {
        if (!enums[id]) {
            console.warn(`No set exists for id ${id}`);
            return null;
        }

        const set = this.furnitureSets[enums[id]];

        const ordered: Array<Array<Piece>> = [[], [], [], [], []];

        set.items.forEach((item: Piece) => {
            ordered[item.rarity.index].push(item);
        });

        set.items = [];
        ordered.forEach((order: Array<Piece>) => {
            order.forEach((item: Piece) => {
                set.items.push({
                    ...item,
                    set: set,
                });
            });
        });

        return set;
    }

    /**
     *
     * @returns {Array<SetInfo>} Returns an array of all sets
     */
    public getAllFurnitureSets(): Array<SetInfo> {
        return Object.entries(this.furnitureSets)
            .map(([_, value]) => this.getFurnitureSet(value.id))
            .filter((set): set is SetInfo => set !== null);
    }
    /**
     * import Category from initializeFurniture and use those as category id
     *
     * @param {PieceType} cat Short for category
     * @returns {Array<Piece>} Returns an array of Pieces with the same category
     */
    public getPiecesByCategory(cat: PieceType): Array<Piece> {
        const getName = (v: unknown) =>
            v && typeof v === 'object' && 'name' in (v as any)
                ? String((v as any).name).toUpperCase()
                : String(v ?? '').toUpperCase();

        const target = getName(cat);
        const ret: Array<Piece> = [];

        this.getAllFurnitureSets().forEach((set: SetInfo) => {
            set.items.forEach((piece: Piece) => {
                if (getName((piece as any).type) === target) {
                    ret.push({
                        ...piece,
                        set: set,
                    });
                }
            });
        });

        return ret;
    }
    /**
     *
     * @param {string} search keyword to search with
     * @param {TFunction} t translator function, must be set to 'furnitureinfo'
     * @returns {Array<Piece>} Returns an array of Pieces matching the search
     */
    public getPiecesByKeyword(search: string, t: TFunction<any, string>): Array<Piece> {
        const ret: Array<Piece> = [];

        search = search.toLowerCase();
        this.getAllFurnitureSets().map((set: SetInfo) => {
            return set.items.map((piece: Piece) => {
                const name =
                    `${t(`${set.path}.name`)} ${t(`${set.path}.ITEMS.${piece.path}.name`)}`.toLowerCase();
                const match = name.search(search);
                if (match >= 0) {
                    ret.push({
                        ...piece,
                        set: set,
                    });
                }

                return true;
            });
        });

        return ret;
    }
}

let materialTranslationsMain: Record<string, MaterialTranslation> | undefined;
/**
 * Internal function that parses through raw translation data the first time it is called.
 *
 *
 * @param t
 * @returns
 */
const getMaterialMain = (t: TFunction) => {
    if (materialTranslationsMain) {
        return materialTranslationsMain;
    }
    const raw: $SpecialObject | string = t('materials', { returnObjects: true });

    if (typeof raw === 'string') {
        return t('material-translation-not-found-main');
    }
    const info: Record<string, MaterialTranslation> = {};
    Object.entries({ ...raw }).map((index) => {
        const key = index[0];
        if (typeof key !== 'string') {
            return t('material-translation-invalid-key');
        }

        const value = index[1];
        if (typeof value !== 'object' || !('name' in value) || typeof value.name !== 'string') {
            return t('material-translation-invalid-value');
        }

        info[key] = { name: value.name };
        return true;
    });

    materialTranslationsMain = info;
    return info;
};

/**
 * Function that returns a translated material name.
 *
 * @param {TFunction} t Translator function. Use key 'furnitureinfo'.
 * @param {string} path Path to search for translation. Use 'MaterialType.name'.
 * @returns {string} Translated result or appropriate fallback message.
 */
export const getMaterialName: (t: TFunction, path: string) => string = (
    t: TFunction,
    path: string,
) => {
    const info = getMaterialMain(t);

    if (typeof info === 'string') {
        return info;
    }

    if (!info[path]) {
        return t('material-translation-path-is-null');
    }

    return info[path].name;
};
