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

const enums: Record<string, FurnitureSet> = {
    neuro: FurnitureSet.NEURO,
    taakka: FurnitureSet.TAAKKA,
    rakkaus: FurnitureSet.RAKKAUS,
    muistoja: FurnitureSet.MUISTOJA,
};

type RawSet = { name?: unknown; items?: unknown };

type RawPieceTranslation = { name?: unknown; desc?: unknown };

/**
 * Class for handling furniture sets and regarding methods
 */
export class FurnitureManager {
    private readonly furnitureSets: Record<FurnitureSet, SetInfo>;

    constructor() {
        this.furnitureSets = initializeFurnitureSets();
    }

    /** ---------- helpers to keep complexity down ---------- */
    private isObject(value: unknown): value is Record<string, unknown> {
        return !!value && typeof value === 'object';
    }

    private coerceSet(rawUnknown: unknown): RawSet | null {
        if (!this.isObject(rawUnknown)) return null;
        return rawUnknown as RawSet;
    }

    private readItemsMap(obj: unknown): Record<string, unknown> | null {
        if (!this.isObject(obj)) return null;
        return obj as Record<string, unknown>;
    }

    /**
     * Returns the translation object for a furniture set.
     */
    public getSetTranslation(t: TFunction, path: string): SetTranslation | string {
        const rawUnknown: unknown = t(path, { returnObjects: true });
        if (typeof rawUnknown === 'string') return t('set-translation-missing-raw-data');

        const raw = this.coerceSet(rawUnknown);
        if (!raw || typeof raw.name !== 'string')
            return t('set-translation-missing-raw-properties');

        const itemsObj = this.readItemsMap(raw.items);
        if (!itemsObj) return t('set-translation-missing-raw-properties');

        const items: Record<string, PieceTranslation> = {};
        for (const [key, value] of Object.entries(itemsObj)) {
            if (typeof key !== 'string' || !this.isObject(value))
                return t('set-translation-missing-properties');
            const valueObj = value as RawPieceTranslation;
            if (typeof valueObj.name !== 'string' || typeof valueObj.desc !== 'string') {
                return t('set-translation-missing-properties');
            }
            items[key] = { name: valueObj.name, desc: valueObj.desc };
        }

        return {
            name: raw.name,
            items,
            unknown: {
                name: t('piece-translation-unknown-item'),
                desc: t('piece-translation-unknown-item'),
            },
        };
    }

    /**
     * Returns the translation object for a piece within a furniture set.
     */
    public getPieceTranslation(t: SetTranslation | string, path: string): PieceTranslation {
        if (typeof t === 'string') return { name: t, desc: t };
        return t.items[path] ?? t.unknown;
    }

    /**
     * Returns a furniture set with the items sorted in ascending order by rarity.
     */
    public getFurnitureSet(id: string): SetInfo | null {
        const setKey = enums[id];
        if (!setKey) {
            // eslint-disable-next-line no-console
            console.warn(`No set exists for id ${id}`);
            return null;
        }
        const baseSet = this.furnitureSets[setKey];
        if (!baseSet) return null;

        const buckets: Array<Array<Piece>> = [[], [], [], [], []];
        for (const item of baseSet.items) {
            const idx =
                typeof item?.rarity?.index === 'number'
                    ? Math.max(0, Math.min(4, item.rarity.index))
                    : 0;
            buckets[idx].push(item);
        }

        const sortedItems: Piece[] = [];
        for (const bucket of buckets) {
            for (const item of bucket) {
                sortedItems.push({ ...item, set: baseSet });
            }
        }

        const setInfo: SetInfo = { ...baseSet, items: sortedItems };
        return setInfo;
    }

    /**
     * Returns an array of all sets.
     */
    public getAllFurnitureSets(): Array<SetInfo> {
        const results: SetInfo[] = [];
        for (const value of Object.values(this.furnitureSets)) {
            const setInfo = this.getFurnitureSet(value.id);
            if (setInfo) results.push(setInfo);
        }
        return results;
    }

    /**
     * Returns pieces by category.
     */
    public getPiecesByCategory(cat: PieceType): Array<Piece> {
        const normalize = (val: unknown) => {
            if (val && typeof val === 'object' && 'name' in (val as Record<string, unknown>)) {
                const nm = (val as Record<string, unknown>).name;
                return String(nm ?? '').toUpperCase();
            }
            return String(val ?? '').toUpperCase();
        };

        const target = normalize(cat);
        const ret: Piece[] = [];

        for (const set of this.getAllFurnitureSets()) {
            for (const piece of set.items) {
                const pieceType = (piece as unknown as { type?: unknown }).type;
                if (normalize(pieceType) === target) ret.push({ ...piece, set });
            }
        }

        return ret;
    }

    /**
     * Keyword search across pieces.
     */
    public getPiecesByKeyword(search: string, t: TFunction<any, string>): Array<Piece> {
        const ret: Piece[] = [];
        const needle = search.toLowerCase();

        for (const set of this.getAllFurnitureSets()) {
            for (const piece of set.items) {
                const haystack =
                    `${t(`${set.path}.name`)} ${t(`${set.path}.ITEMS.${piece.path}.name`)}`.toLowerCase();
                if (haystack.includes(needle)) ret.push({ ...piece, set });
            }
        }

        return ret;
    }
}

/** ---- Material translations with per-language cache ---- */
const materialCache: Record<string, Record<string, MaterialTranslation>> = {};

/** Best-effort: read language from TFunction */
const getLangFromT = (t: TFunction): string => {
    const asAny = t as unknown as { language?: string; lng?: string };
    return asAny.language ?? asAny.lng ?? 'default';
};

const getMaterialMain = (t: TFunction): Record<string, MaterialTranslation> | string => {
    const lang = getLangFromT(t);
    if (materialCache[lang]) return materialCache[lang];

    const rawUnknown: unknown = t('materials', { returnObjects: true });
    if (typeof rawUnknown === 'string') return t('material-translation-not-found-main');
    if (!rawUnknown || typeof rawUnknown !== 'object')
        return t('material-translation-invalid-value');

    const info: Record<string, MaterialTranslation> = {};
    for (const [key, value] of Object.entries(rawUnknown as Record<string, unknown>)) {
        if (typeof key !== 'string') return t('material-translation-invalid-key');
        if (
            !value ||
            typeof value !== 'object' ||
            typeof (value as { name?: unknown }).name !== 'string'
        ) {
            return t('material-translation-invalid-value');
        }
        info[key] = { name: (value as { name: string }).name };
    }

    materialCache[lang] = info;
    return info;
};

/**
 * Function that returns a translated material name.
 */
export const getMaterialName: (t: TFunction, path: string) => string = (
    t: TFunction,
    path: string,
) => {
    const info = getMaterialMain(t);
    if (typeof info === 'string') return info;
    return info[path]?.name ?? t('material-translation-path-is-null');
};
