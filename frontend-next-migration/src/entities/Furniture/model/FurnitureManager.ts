import { TFunction } from 'i18next';
import { FurnitureSet, SetInfo, Piece, PieceType } from '../types/furniture';
import { initializeFurnitureSets } from './initializeFurniture';

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
     * Also sorts the items in ascending order by rarity.
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
     * import Types from initializeFurniture and use those as category id
     *
     * @param {PieceType} cat Short for category
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
