import rakkausCover from '@/shared/assets/images/furniture/rakkaus/cover.webp';
import rakkauscloset from '@/shared/assets/images/furniture/rakkaus/posters/closet.webp';
import rakkausctable from '@/shared/assets/images/furniture/rakkaus/posters/coffeetable.webp';
import rakkauslamp from '@/shared/assets/images/furniture/rakkaus/posters/lamp.webp';
import rakkauscarpet from '@/shared/assets/images/furniture/rakkaus/posters/carpet.webp';
import rakkausarmchair from '@/shared/assets/images/furniture/rakkaus/posters/armchair.webp';
import rakkausmirror from '@/shared/assets/images/furniture/rakkaus/posters/mirror.webp';
import rakkaustable from '@/shared/assets/images/furniture/rakkaus/posters/table.webp';
import rakkausbed from '@/shared/assets/images/furniture/rakkaus/posters/bed.webp';
import rakkaussofa from '@/shared/assets/images/furniture/rakkaus/posters/couch.webp';
import rakkausbook from '@/shared/assets/images/furniture/rakkaus/posters/book.webp';
import rakkauscandles from '@/shared/assets/images/furniture/rakkaus/posters/candles.webp';
import rakkausbooks from '@/shared/assets/images/furniture/rakkaus/posters/books.webp';
import rakkauspillow from '@/shared/assets/images/furniture/rakkaus/posters/pillow.webp';
import rakkausplush from '@/shared/assets/images/furniture/rakkaus/posters/elephant.webp';
import rakkausflower from '@/shared/assets/images/furniture/rakkaus/posters/flower.webp';
import { FurnitureSetCoverPosition, SetInfo } from '../../../types/furniture';
import { categories } from '../categories';
import { materials } from '../materials';
import { recycles } from '../recycles';
import { rarityList } from '../rarities';

export const rakkausSet: SetInfo = {
    id: 'rakkaus',
    path: 'RAKKAUSSET',
    author: 'IV',
    cover: rakkausCover,
    coverposition: FurnitureSetCoverPosition.MEDIUM,
    items: [
        {
            num: 'F41.8',
            type: categories.COUCHES,
            path: 'COUCH',
            weight: 27,
            cost: 130,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD, materials.POLYESTER],
            recycling: [recycles.GENERAL],
            cover: rakkaussofa,
        },
        {
            num: 'F41.8',
            type: categories.CHAIRS,
            path: 'ARMCHAIR',
            weight: 13,
            cost: 100,
            rarity: rarityList.COMMON,
            materials: [materials.POLYESTER, materials.WOOD],
            recycling: [recycles.GENERAL],
            cover: rakkausarmchair,
        },
        {
            num: '',
            type: categories.LIGHTS,
            path: 'CEILINGLAMP',
            weight: 2,
            cost: 200,
            rarity: rarityList.EPIC,
            materials: [materials.GLASS],
            recycling: [recycles.GLASS],
            cover: rakkauslamp,
        },
        {
            num: '',
            type: categories.TABLES,
            path: 'DININGTABLE',
            weight: 30,
            cost: 100,
            rarity: rarityList.RARE,
            materials: [materials.WOOD],
            recycling: [recycles.WOOD],
            cover: rakkaustable,
        },
        {
            num: '',
            type: categories.TABLES,
            path: 'TABLE',
            weight: 20,
            cost: 60,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD],
            recycling: [recycles.WOOD],
            cover: rakkausctable,
        },
        {
            num: '',
            type: categories.BEDS,
            path: 'BED',
            weight: 20,
            cost: 200,
            rarity: rarityList.RARE,
            materials: [materials.WOOD, materials.POLYESTER],
            recycling: [recycles.GENERAL],
            cover: rakkausbed,
        },
        {
            num: 'F41.2',
            type: categories.RUGS,
            path: 'CARPET',
            weight: 6,
            cost: 150,
            rarity: rarityList.COMMON,
            materials: [materials.FABRIC],
            recycling: [recycles.GENERAL],
            cover: rakkauscarpet,
        },
        {
            num: 'F40.8',
            type: categories.WALL,
            path: 'MIRROR',
            weight: 10,
            cost: 170,
            rarity: rarityList.COMMON,
            materials: [materials.MGLASS, materials.METAL],
            recycling: [recycles.GLASS],
            cover: rakkausmirror,
        },
        {
            num: 'F41.8',
            type: categories.CABINETS,
            path: 'CLOSET',
            weight: 45,
            cost: 130,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD],
            recycling: [recycles.WOOD],
            cover: rakkauscloset,
        },
        {
            num: 'R45.5',
            type: categories.ITEMS,
            path: 'CANDLES',
            weight: 0.3,
            cost: 30,
            rarity: rarityList.COMMON,
            materials: [materials.WAX],
            recycling: [recycles.GENERAL],
            cover: rakkauscandles,
        },
        {
            num: 'R46.1',
            type: categories.ITEMS,
            path: 'BOOKS',
            weight: 3,
            cost: 60,
            rarity: rarityList.RARE,
            materials: [materials.PAPER],
            recycling: [recycles.PAPER],
            cover: rakkausbooks,
        },
        {
            num: 'F60.7',
            type: categories.ITEMS,
            path: 'PLUSH',
            weight: 1,
            cost: 100,
            rarity: rarityList.EPIC,
            materials: [materials.POLYESTER],
            recycling: [recycles.GENERAL],
            cover: rakkausplush,
        },
        {
            num: 'F32',
            type: categories.ITEMS,
            path: 'FLOWER',
            weight: 2,
            cost: 50,
            rarity: rarityList.COMMON,
            materials: [materials.CLAY, materials.PLANT],
            recycling: [recycles.BIOWASTE],
            cover: rakkausflower,
        },
        {
            num: 'F60.4',
            type: categories.ITEMS,
            path: 'BOOK',
            weight: 0.5,
            cost: 30,
            rarity: rarityList.COMMON,
            materials: [materials.PAPER],
            recycling: [recycles.PAPER],
            cover: rakkausbook,
        },
        {
            num: 'F43.1',
            type: categories.ITEMS,
            path: 'PILLOW',
            weight: 0.5,
            cost: 50,
            rarity: rarityList.COMMON,
            materials: [materials.POLYESTER],
            recycling: [recycles.GENERAL],
            cover: rakkauspillow,
        },
    ],
};
