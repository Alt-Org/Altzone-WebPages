import { FurnitureSet, SetInfo, Piece } from '../types/set';
import { initializeFurnitureSets } from './initializeFurniture';

const enums: Record<string, FurnitureSet> = {
    neuro: FurnitureSet.NEURO,
    taakka: FurnitureSet.TAAKKA,
    rakkaus: FurnitureSet.RAKKAUS,
};

export class FurnitureManager {
    private readonly t: (key: string) => string;
    private readonly furnitureSets: Record<FurnitureSet, SetInfo>;

    constructor(t: (key: string) => string) {
        this.t = t;
        this.furnitureSets = initializeFurnitureSets(t);
    }

    public getAllFurnitureSets() {
        return Object.entries(this.furnitureSets).map((set) => {
            return set[1];
        });
    }
    public getFurnitureSet(id: string) {
        const set = this.furnitureSets[enums[id]];
        set.items = set.items.map((item: Piece) => {
            return {
                ...item,
                set: set,
            };
        });
        return set;
    }
}
