import { FurnitureSet, SetInfo, Piece } from '../types/set';
import { initializeFurnitureSets } from './initializeFurniture';

const enums: Record<string, FurnitureSet> = {
    neuro: FurnitureSet.NEURO,
    taakka: FurnitureSet.TAAKKA,
    rakkaus: FurnitureSet.RAKKAUS,
    scrodinger: FurnitureSet.SCRODINGER,
};

export class FurnitureManager {
    private readonly furnitureSets: Record<FurnitureSet, SetInfo>;

    constructor() {
        this.furnitureSets = initializeFurnitureSets();
    }

    public getAllFurnitureSets() {
        return Object.entries(this.furnitureSets).map((set) => {
            return set[1];
        });
    }
    public getFurnitureSet(id: string) {
        const set = this.furnitureSets[enums[id]];

        const ordered: Array<Array<Piece>> = [[], [], [], [], []];

        set.items.map((item: Piece) => {
            ordered[item.rarity.index].push(item);
            return true;
        });

        set.items = [];
        ordered.map((order: Array<Piece>) => {
            order.map((item: Piece) => {
                set.items.push(item);
                return true;
            });
            return true;
        });

        return set;
    }
}
