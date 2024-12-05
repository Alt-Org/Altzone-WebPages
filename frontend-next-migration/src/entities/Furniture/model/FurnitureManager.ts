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

    public getAllFurnitureSets() {
        return Object.entries(this.furnitureSets).map((set) => {
            return {
                ...this.getFurnitureSet(set[1].id),
            };
        });
    }
    public getFurnitureSet(id: string) {
        if (!enums[id]) {
            throw new Error('no set exists for id ' + String(id));
        }
        const set = this.furnitureSets[enums[id]];
        if (!set) {
            throw new Error('no set exists for id ' + String(id));
        }

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
    public getPiecesByCategory(cat: PieceType) {
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
    public getPiecesByKeyword(search: string, t: TFunction<any, string>) {
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
