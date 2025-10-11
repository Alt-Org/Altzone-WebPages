import muistojaCover from '@/shared/assets/images/furniture/muistoja/cover.webp';
import muistojaarmchair from '@/shared/assets/images/furniture/muistoja/posters/armchair.webp';
import muistojacarpet from '@/shared/assets/images/furniture/muistoja/posters/carpet.webp';
import muistojactable from '@/shared/assets/images/furniture/muistoja/posters/coffeetable.webp';
import muistojacommode from '@/shared/assets/images/furniture/muistoja/posters/commode.webp';
import muistojadrawings from '@/shared/assets/images/furniture/muistoja/posters/drawings.webp';
import muistojaficus from '@/shared/assets/images/furniture/muistoja/posters/ficus.webp';
import muistojaflowers from '@/shared/assets/images/furniture/muistoja/posters/flowers.webp';
import muistojafox from '@/shared/assets/images/furniture/muistoja/posters/fox.webp';
import muistojaoldcarpet from '@/shared/assets/images/furniture/muistoja/posters/oldcarpet.webp';
import muistojaoldwindow from '@/shared/assets/images/furniture/muistoja/posters/oldwindow.webp';
import muistojapainting from '@/shared/assets/images/furniture/muistoja/posters/painting.webp';
import muistojapictures from '@/shared/assets/images/furniture/muistoja/posters/pictures.webp';
import muistojasofa from '@/shared/assets/images/furniture/muistoja/posters/sofa.webp';
import muistojawindow from '@/shared/assets/images/furniture/muistoja/posters/window.webp';
import { FurnitureSetCoverPosition, SetInfo } from '../../../types/furniture';
import { categories } from '../categories';
import { materials } from '../materials';
import { recycles } from '../recycles';
import { rarityList } from '../rarities';

export const muistojaSet: SetInfo = {
    id: 'muistoja',
    path: 'MUISTOJASET',
    author: 'Tähti',
    cover: muistojaCover,
    coverposition: FurnitureSetCoverPosition.FULL,
    items: [
        {
            num: 'F44',
            type: categories.COUCHES,
            path: 'COUCH',
            weight: 20,
            cost: 100,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD, materials.LEATHER],
            recycling: [recycles.GENERAL],
            cover: muistojasofa,
        },
        {
            num: 'F44',
            type: categories.CHAIRS,
            path: 'ARMCHAIR',
            weight: 5,
            cost: 60,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD, materials.LEATHER],
            recycling: [recycles.GENERAL],
            cover: muistojaarmchair,
        },
        {
            num: 'F44',
            type: categories.PLANTS,
            path: 'FICUS',
            weight: 3,
            cost: 120,
            rarity: rarityList.RARE,
            materials: [materials.PLANT, materials.PLASTIC, materials.CLAY],
            recycling: [recycles.GENERAL, recycles.BIOWASTE],
            cover: muistojaficus,
        },
        {
            num: 'F44',
            type: categories.PLANTS,
            path: 'FLOWERS',
            weight: 1,
            cost: 50,
            rarity: rarityList.COMMON,
            materials: [materials.PLANT, materials.GLASS, materials.PLASTIC],
            recycling: [recycles.GENERAL, recycles.BIOWASTE],
            cover: muistojaflowers,
        },
        {
            num: 'F44',
            type: categories.TABLES,
            path: 'COFFEETABLE',
            weight: 20,
            cost: 60,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD, materials.PAPER],
            recycling: [recycles.WOOD],
            cover: muistojactable,
        },
        {
            num: 'F44',
            type: categories.TABLES,
            path: 'DRAWER',
            weight: 17,
            cost: 100,
            rarity: rarityList.RARE,
            materials: [materials.WOOD, materials.PAPER, materials.FABRIC],
            recycling: [recycles.WOOD],
            cover: muistojacommode,
        },
        {
            num: 'F44',
            type: categories.RUGS,
            path: 'OLDCARPET',
            weight: 7,
            cost: 150,
            rarity: rarityList.RARE,
            materials: [materials.FABRIC],
            recycling: [recycles.GENERAL],
            cover: muistojaoldcarpet,
        },
        {
            num: 'F44',
            type: categories.RUGS,
            path: 'NEWCARPET',
            weight: 7,
            cost: 150,
            rarity: rarityList.RARE,
            materials: [materials.FABRIC],
            recycling: [recycles.GENERAL],
            cover: muistojacarpet,
        },
        {
            num: 'F44',
            type: categories.WALL,
            path: 'PAINTING',
            weight: 2,
            cost: 40,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD],
            recycling: [recycles.GENERAL],
            cover: muistojapainting,
        },
        {
            num: 'F44',
            type: categories.WALL,
            path: 'DRAWINGS',
            weight: 1,
            cost: 60,
            rarity: rarityList.RARE,
            materials: [materials.PAPER],
            recycling: [recycles.PAPER],
            cover: muistojadrawings,
        },
        {
            num: 'F44',
            type: categories.WALL,
            path: 'PICTURES',
            weight: 2,
            cost: 60,
            rarity: rarityList.COMMON,
            materials: [materials.WOOD],
            recycling: [recycles.GENERAL],
            cover: muistojapictures,
        },
        {
            num: 'F44',
            type: categories.WALL,
            path: 'OLDWINDOW',
            weight: 1,
            cost: 50,
            rarity: rarityList.COMMON,
            materials: [materials.GLASS, materials.FABRIC],
            recycling: [recycles.GLASS],
            cover: muistojaoldwindow,
        },
        {
            num: 'F44',
            type: categories.WALL,
            path: 'NEWWINDOW',
            weight: 1,
            cost: 50,
            rarity: rarityList.COMMON,
            materials: [materials.GLASS, materials.FABRIC],
            recycling: [recycles.GLASS],
            cover: muistojawindow,
        },
        {
            num: 'F44',
            type: categories.ITEMS,
            path: 'FOXTOY',
            weight: 1,
            cost: 70,
            rarity: rarityList.RARE,
            materials: [materials.FABRIC],
            recycling: [recycles.GENERAL],
            cover: muistojafox,
        },
    ],
};
