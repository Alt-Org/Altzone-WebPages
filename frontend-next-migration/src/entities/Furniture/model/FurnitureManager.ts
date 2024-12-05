import { useClientTranslation } from '@/shared/i18n';
import { FurnitureSet, SetInfo, Piece, PieceType } from '../types/set';
import { initializeFurnitureSets } from './initializeFurniture';
import { TFunction } from 'i18next';

const enums: Record<string, FurnitureSet> = {
    neuro: FurnitureSet.NEURO,
    taakka: FurnitureSet.TAAKKA,
    rakkaus: FurnitureSet.RAKKAUS,
};

export class FurnitureManager {
    private readonly furnitureSets: Record<FurnitureSet, SetInfo>;

    constructor() {
        this.furnitureSets = initializeFurnitureSets();
    }

    /**
     *
     * @returns {Array<SetInfo>} Returns an array of all sets
     */
    public getAllFurnitureSets(): Array<SetInfo> {
        return Object.entries(this.furnitureSets).map((set) => {
            return {
                ...this.getFurnitureSet(set[1].id),
            };
        });
    }
    /**
     *
     * @param {string} id The id of the furniture set
     * @throws {Error} Throws an error if the set does not exist
     * @returns {SetInfo} Returns a single set
     */
    public getFurnitureSet(id: string): SetInfo {
        if (!enums[id]) {
            throw new Error('no set exists for id ' + String(id));
        }
        const set = this.furnitureSets[enums[id]];

        const ordered: Array<Array<Piece>> = [[], [], [], [], []];

        set.items.map((item: Piece) => {
            ordered[item.rarity.index].push(item);
            return true;
        });

        set.items = [];
        ordered.map((order: Array<Piece>) => {
            order.map((item: Piece) => {
                set.items.push({
                    ...item,
                    set: set,
                });
                return true;
            });
            return true;
        });

        return set;
    }
    /**
     *
     * @param {PieceType} cat Short for category id
     * @returns {Array<Piece>} Returns an array of Pieces with the same category
     */
    public getPiecesByCategory(cat: PieceType): Array<Piece> {
        const ret: Array<Piece> = [];

        this.getAllFurnitureSets().map((set: SetInfo) => {
            return set.items.map((piece: Piece) => {
                if (piece.type === cat) {
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
    /**
     *
     * @param {string} search keyword to search with
     * @param {TFunction} t translator object, must be set to 'furnitureinfo'
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
