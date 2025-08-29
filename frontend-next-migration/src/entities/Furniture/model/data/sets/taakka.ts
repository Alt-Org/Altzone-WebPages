import taakkaCover from '@/shared/assets/images/furniture/taakka/cover.webp';
import taakkaarmchair from '@/shared/assets/images/furniture/taakka/posters/armchair.webp';
import taakkacloset from '@/shared/assets/images/furniture/taakka/posters/closet.webp';
import taakkamirror from '@/shared/assets/images/furniture/taakka/posters/mirror.webp';
import taakkalamp from '@/shared/assets/images/furniture/taakka/posters/lamp.webp';
import taakkacouch from '@/shared/assets/images/furniture/taakka/posters/sofa.webp';
import taakkastable from '@/shared/assets/images/furniture/taakka/posters/sidetable.webp';
import taakkatable from '@/shared/assets/images/furniture/taakka/posters/coffeetable.webp';
import { FurnitureSetCoverPosition, SetInfo } from '../../../types/furniture';
import { categories } from '../categories';
import { materials } from '../materials';
import { recycles } from '../recycles';
import { rarityList } from '../rarities';

export const taakkaSet: SetInfo = {
    id: 'taakka',
    path: 'TAAKKASET',
    author: 'Simo Ryhänen',
    cover: taakkaCover,
    coverposition: FurnitureSetCoverPosition.SMALL, // TODO: hardcode
    items: [
        {
            num: 'R45.0',
            type: categories.COUCHES,
            path: 'COUCH',
            weight: 30,
            cost: 150,
            rarity: rarityList.RARE,
            materials: [materials.POLYESTER],
            recycling: [recycles.GENERAL],
            cover: taakkacouch,
        },
        {
            num: 'R45.0',
            type: categories.CHAIRS,
            path: 'ARMCHAIR',
            weight: 16,
            cost: 120,
            rarity: rarityList.RARE,
            materials: [materials.POLYESTER, materials.WOOD],
            recycling: [recycles.GENERAL],
            cover: taakkaarmchair,
        },
        {
            num: 'R45.0',
            type: categories.LIGHTS,
            path: 'FLOORLAMP',
            weight: 2.8,
            cost: 240,
            rarity: rarityList.EPIC,
            materials: [materials.ALUMINIUM],
            recycling: [recycles.ELECTRONICS],
            cover: taakkalamp,
        },
        {
            num: 'R45.0',
            type: categories.TABLES,
            path: 'TABLE',
            weight: 26,
            cost: 80,
            rarity: rarityList.COMMON,
            materials: [materials.MELAMINE, materials.BOARD],
            recycling: [recycles.WOOD],
            cover: taakkatable,
        },
        {
            num: 'R45.0',
            type: categories.TABLES,
            path: 'SIDETABLE',
            weight: 16,
            cost: 60,
            rarity: rarityList.COMMON,
            materials: [materials.MELAMINE, materials.BOARD],
            recycling: [recycles.WOOD],
            cover: taakkastable,
        },
        {
            num: 'R45.0',
            type: categories.MIRRORS,
            path: 'FULLMIRROR',
            weight: 8,
            cost: 100,
            rarity: rarityList.COMMON,
            materials: [materials.MGLASS, materials.WOOD],
            recycling: [recycles.GENERAL],
            cover: taakkamirror,
        },
        {
            num: 'R45.0',
            type: categories.CABINETS,
            path: 'CLOSET',
            weight: 48,
            cost: 120,
            rarity: rarityList.RARE,
            materials: [materials.WOOD],
            recycling: [recycles.WOOD],
            cover: taakkacloset,
        },
    ],
};
