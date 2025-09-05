import { Recycles, RecycleType } from '../../types/furniture';

export const recycles: Record<Recycles, RecycleType> = {
    [Recycles.GENERAL]: { name: 'GENERAL' },
    [Recycles.ELECTRONICS]: { name: 'ELECTRONICS' },
    [Recycles.GLASS]: { name: 'GLASS' },
    [Recycles.WOOD]: { name: 'WOOD' },
    [Recycles.METAL]: { name: 'METAL' },
    [Recycles.PLASTIC]: { name: 'PLASTIC' },
    [Recycles.DUMP]: { name: 'DUMP' },
    [Recycles.BIOWASTE]: { name: 'BIOWASTE' },
    [Recycles.PAPER]: { name: 'PAPER' },
};
