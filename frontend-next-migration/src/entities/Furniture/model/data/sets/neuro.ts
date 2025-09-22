import neuroCover from '@/shared/assets/images/furniture/neuro/cover.webp';
import neuroclock from '@/shared/assets/images/furniture/neuro/posters/clock.webp';
import neurochair from '@/shared/assets/images/furniture/neuro/posters/chair.webp';
import neurostool from '@/shared/assets/images/furniture/neuro/posters/stool.webp';
import neurodrawer from '@/shared/assets/images/furniture/neuro/posters/drawer.webp';
import { FurnitureSetCoverPosition, SetInfo } from '../../../types/furniture';
import { categories } from '../categories';
import { materials } from '../materials';
import { recycles } from '../recycles';
import { rarityList } from '../rarities';

export const neuroSet: SetInfo = {
    id: 'neuro',
    path: 'NEUROSET',
    author: 'Simo Ryhänen',
    cover: neuroCover,
    coverposition: FurnitureSetCoverPosition.SMALL, // TODO: selvitettävä miksi hardcode
    items: [
        {
            path: 'CLOCK',
            num: 'F30',
            type: categories.WALL,
            weight: 1,
            cost: 40,
            rarity: rarityList.COMMON,
            materials: [materials.ELECTRONICS, materials.ALUMINIUM],
            recycling: [recycles.ELECTRONICS],
            cover: neuroclock,
        },
        {
            path: 'CHAIR',
            num: 'R44.1',
            type: categories.CHAIRS,
            weight: 10,
            cost: 170,
            rarity: rarityList.EPIC,
            materials: [materials.ALUMINIUM, materials.LEATHER],
            recycling: [recycles.GENERAL, recycles.ELECTRONICS],
            cover: neurochair,
        },
        {
            path: 'STOOL',
            num: 'R41',
            type: categories.CHAIRS,
            weight: 4,
            cost: 40,
            rarity: rarityList.COMMON,
            materials: [materials.ALUMINIUM, materials.LEATHER],
            recycling: [recycles.GENERAL, recycles.ELECTRONICS],
            cover: neurostool,
        },
        {
            path: 'DRAWER',
            num: 'F41.1',
            type: categories.CABINETS,
            weight: 24,
            cost: 100,
            rarity: rarityList.RARE,
            materials: [materials.BOARD, materials.ALUMINIUM],
            recycling: [recycles.ELECTRONICS, recycles.WOOD],
            cover: neurodrawer,
        },
    ],
};
