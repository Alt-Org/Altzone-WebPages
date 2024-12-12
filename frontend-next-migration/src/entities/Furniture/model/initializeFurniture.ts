import neuroCover from '@/shared/assets/images/furniture/neuro/cover.webp';
import taakkaCover from '@/shared/assets/images/furniture/taakka/cover.webp';
import rakkausCover from '@/shared/assets/images/furniture/rakkaus/cover.webp';
import muistojaCover from '@/shared/assets/images/furniture/muistoja/cover.webp';
import rakkauscloset from '@/shared/assets/images/furniture/rakkaus/posters/closet.png';
import rakkausctable from '@/shared/assets/images/furniture/rakkaus/posters/coffeetable.png';
import rakkauslamp from '@/shared/assets/images/furniture/rakkaus/posters/lamp.png';
import rakkauscarpet from '@/shared/assets/images/furniture/rakkaus/posters/carpet.png';
import rakkausarmchair from '@/shared/assets/images/furniture/rakkaus/posters/armchair.png';
import rakkausmirror from '@/shared/assets/images/furniture/rakkaus/posters/mirror.png';
import rakkaustable from '@/shared/assets/images/furniture/rakkaus/posters/table.png';
import rakkausbed from '@/shared/assets/images/furniture/rakkaus/posters/bed.png';
import rakkaussofa from '@/shared/assets/images/furniture/rakkaus/posters/couch.png';
import rakkausbook from '@/shared/assets/images/furniture/rakkaus/posters/book.png';
import rakkauscandles from '@/shared/assets/images/furniture/rakkaus/posters/candles.png';
import rakkausbooks from '@/shared/assets/images/furniture/rakkaus/posters/books.png';
import rakkauspillow from '@/shared/assets/images/furniture/rakkaus/posters/pillow.png';
import rakkausplush from '@/shared/assets/images/furniture/rakkaus/posters/elephant.png';
import rakkausflower from '@/shared/assets/images/furniture/rakkaus/posters/flower.png';
import neuroclock from '@/shared/assets/images/furniture/neuro/posters/clock.png';
import neurochair from '@/shared/assets/images/furniture/neuro/posters/chair.png';
import neurostool from '@/shared/assets/images/furniture/neuro/posters/stool.png';
import neurodrawer from '@/shared/assets/images/furniture/neuro/posters/drawer.png';
import taakkaarmchair from '@/shared/assets/images/furniture/taakka/posters/armchair.png';
import taakkacloset from '@/shared/assets/images/furniture/taakka/posters/closet.png';
import taakkamirror from '@/shared/assets/images/furniture/taakka/posters/mirror.png';
import taakkalamp from '@/shared/assets/images/furniture/taakka/posters/lamp.png';
import taakkacouch from '@/shared/assets/images/furniture/taakka/posters/sofa.png';
import taakkastable from '@/shared/assets/images/furniture/taakka/posters/sidetable.png';
import taakkatable from '@/shared/assets/images/furniture/taakka/posters/coffeetable.png';
import muistojaarmchair from '@/shared/assets/images/furniture/muistoja/posters/armchair.png';
import muistojacarpet from '@/shared/assets/images/furniture/muistoja/posters/carpet.png';
import muistojactable from '@/shared/assets/images/furniture/muistoja/posters/coffeetable.png';
import muistojacommode from '@/shared/assets/images/furniture/muistoja/posters/commode.png';
import muistojadrawings from '@/shared/assets/images/furniture/muistoja/posters/drawings.png';
import muistojaficus from '@/shared/assets/images/furniture/muistoja/posters/ficus.png';
import muistojaflowers from '@/shared/assets/images/furniture/muistoja/posters/flowers.png';
import muistojafox from '@/shared/assets/images/furniture/muistoja/posters/fox.png';
import muistojaoldcarpet from '@/shared/assets/images/furniture/muistoja/posters/oldcarpet.png';
import muistojaoldwindow from '@/shared/assets/images/furniture/muistoja/posters/oldwindow.png';
import muistojapainting from '@/shared/assets/images/furniture/muistoja/posters/painting.png';
import muistojapictures from '@/shared/assets/images/furniture/muistoja/posters/pictures.png';
import muistojasofa from '@/shared/assets/images/furniture/muistoja/posters/sofa.png';
import muistojawindow from '@/shared/assets/images/furniture/muistoja/posters/window.png';
import {
    FurnitureSet,
    SetInfo,
    PieceRarity,
    Rarities,
    Types,
    FurnitureSetCoverPosition,
    PieceType,
    Materials,
    MaterialType,
    Recycles,
    RecycleType,
} from '../types/set';

export const rarityList: Record<Rarities, PieceRarity> = {
    [Rarities.COMMON]: {
        name: 'COMMON',
        color: '#FFB3AA',
        lightcolor: '#FFEAE8',
        darkcolor: '#FF8479',
        index: 0,
    },
    [Rarities.RARE]: {
        name: 'RARE',
        color: '#D5D5D5',
        lightcolor: '#F3F3F3',
        darkcolor: '#BDBDBD',
        index: 1,
    },
    [Rarities.EPIC]: {
        name: 'EPIC',
        color: '#FFEBA7',
        lightcolor: '#FFF9E7',
        darkcolor: '#FFDE73',
        index: 2,
    },
    [Rarities.ANTIQUE]: {
        name: 'ANTIQUE',
        color: '#B1DFEA',
        lightcolor: '#EAF6F9',
        darkcolor: '#EAF6F9',
        index: 3,
    },
    [Rarities.NONE]: {
        name: 'UNKNOWN',
        color: '#000000',
        lightcolor: '#000000',
        darkcolor: '#000000',
        index: 4,
    },
};
export const types: Record<Types, PieceType> = {
    [Types.CHAIRS]: {
        name: 'TYPES.CHAIRS.name',
    },
    [Types.CABINETS]: {
        name: 'TYPES.CABINETS.name',
    },
    [Types.COUCHES]: {
        name: 'TYPES.COUCHES.name',
    },
    [Types.LIGHTS]: {
        name: 'TYPES.LIGHTS.name',
    },
    [Types.PLANTS]: {
        name: 'TYPES.PLANTS.name',
    },
    [Types.TABLES]: {
        name: 'TYPES.TABLES.name',
    },
    [Types.RUGS]: {
        name: 'TYPES.RUGS.name',
    },
    [Types.WALL]: {
        name: 'TYPES.WALL.name',
    },
    [Types.MIRRORS]: {
        name: 'TYPES.MIRRORS.name',
    },
    [Types.TOILETS]: {
        name: 'TYPES.TOILETS.name',
    },
    [Types.SINKS]: {
        name: 'TYPES.SINKS.name',
    },
    [Types.BEDS]: {
        name: 'TYPES.BEDS.name',
    },
    [Types.ITEMS]: {
        name: 'TYPES.ITEMS.name',
    },
};
export const materials: Record<Materials, MaterialType> = {
    [Materials.WOOD]: {
        name: 'MATERIALS.WOOD.name',
    },
    [Materials.POLYESTER]: {
        name: 'MATERIALS.POLYESTER.name',
    },
    [Materials.ALUMINIUM]: {
        name: 'MATERIALS.ALUMINIUM.name',
    },
    [Materials.LEATHER]: {
        name: 'MATERIALS.LEATHER.name',
    },
    [Materials.GLASS]: {
        name: 'MATERIALS.GLASS.name',
    },
    [Materials.MELAMINE]: {
        name: 'MATERIALS.MELAMINE.name',
    },
    [Materials.BOARD]: {
        name: 'MATERIALS.BOARD.name',
    },
    [Materials.FABRIC]: {
        name: 'MATERIALS.FABRIC.name',
    },
    [Materials.METAL]: {
        name: 'MATERIALS.METAL.name',
    },
    [Materials.ELECTRONICS]: {
        name: 'MATERIALS.ELECTRONICS.name',
    },
    [Materials.PORCELAIN]: {
        name: 'MATERIALS.PORCELAIN.name',
    },
    [Materials.MGLASS]: {
        name: 'MATERIALS.MGLASS.name',
    },
    [Materials.STEEL]: {
        name: 'MATERIALS.STEEL.name',
    },
    [Materials.PLASTIC]: {
        name: 'MATERIALS.PLASTIC.name',
    },
    [Materials.CLAY]: {
        name: 'MATERIALS.CLAY.name',
    },
    [Materials.PLANT]: {
        name: 'MATERIALS.PLANT.name',
    },
    [Materials.PAPER]: {
        name: 'MATERIALS.PAPER.name',
    },
    [Materials.WAX]: {
        name: 'MATERIALS.WAX.name',
    },
};
export const recycles: Record<Recycles, RecycleType> = {
    [Recycles.GENERAL]: {
        name: 'RECYCLES.GENERAL.name',
    },
    [Recycles.ELECTRONICS]: {
        name: 'RECYCLES.ELECTRONICS.name',
    },
    [Recycles.GLASS]: {
        name: 'RECYCLES.GLASS.name',
    },
    [Recycles.WOOD]: {
        name: 'RECYCLES.WOOD.name',
    },
    [Recycles.METAL]: {
        name: 'RECYCLES.METAL.name',
    },
    [Recycles.PLASTIC]: {
        name: 'RECYCLES.PLASTIC.name',
    },
    [Recycles.DUMP]: {
        name: 'RECYCLES.DUMP.name',
    },
    [Recycles.BIOWASTE]: {
        name: 'RECYCLES.BIOWASTE.name',
    },
    [Recycles.PAPER]: {
        name: 'RECYCLES.PAPER.name',
    },
};

export const initializeFurnitureSets = (): Record<FurnitureSet, SetInfo> => {
    return {
        [FurnitureSet.NEURO]: {
            id: 'neuro',
            path: 'NEUROSET',
            author: 'Simo Ryhänen',
            cover: neuroCover,
            coverposition: FurnitureSetCoverPosition.SMALL,
            items: [
                {
                    path: 'CLOCK',
                    num: 'F30',
                    type: types.WALL,
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
                    type: types.CHAIRS,
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
                    type: types.CHAIRS,
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
                    type: types.CABINETS,
                    weight: 24,
                    cost: 100,
                    rarity: rarityList.RARE,
                    materials: [materials.BOARD, materials.ALUMINIUM],
                    recycling: [recycles.ELECTRONICS, recycles.WOOD],
                    cover: neurodrawer,
                },
            ],
        },
        [FurnitureSet.TAAKKA]: {
            id: 'taakka',
            path: 'TAAKKASET',
            author: 'Simo Ryhänen',
            cover: taakkaCover,
            coverposition: FurnitureSetCoverPosition.SMALL,
            items: [
                {
                    num: 'R45.0',
                    type: types.COUCHES,
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
                    type: types.CHAIRS,
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
                    type: types.LIGHTS,
                    // eslint-disable-next-line max-lines
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
                    type: types.TABLES,
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
                    type: types.TABLES,
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
                    type: types.MIRRORS,
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
                    type: types.CABINETS,
                    path: 'CLOSET',
                    weight: 48,
                    cost: 120,
                    rarity: rarityList.RARE,
                    materials: [materials.WOOD],
                    recycling: [recycles.WOOD],
                    cover: taakkacloset,
                },
            ],
        },
        [FurnitureSet.RAKKAUS]: {
            id: 'rakkaus',
            path: 'RAKKAUSSET',
            author: 'IV',
            cover: rakkausCover,
            coverposition: FurnitureSetCoverPosition.MEDIUM,
            items: [
                {
                    num: 'F41.8',
                    type: types.COUCHES,
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
                    type: types.CHAIRS,
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
                    type: types.LIGHTS,
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
                    type: types.TABLES,
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
                    type: types.TABLES,
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
                    type: types.BEDS,
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
                    type: types.RUGS,
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
                    type: types.WALL,
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
                    type: types.CABINETS,
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
                    type: types.ITEMS,
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
                    type: types.ITEMS,
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
                    type: types.ITEMS,
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
                    type: types.ITEMS,
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
                    type: types.ITEMS,
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
                    type: types.ITEMS,
                    path: 'PILLOW',
                    weight: 0.5,
                    cost: 50,
                    rarity: rarityList.COMMON,
                    materials: [materials.POLYESTER],
                    recycling: [recycles.GENERAL],
                    cover: rakkauspillow,
                },
            ],
        },
        [FurnitureSet.MUISTOJA]: {
            id: 'muistoja',
            path: 'MUISTOJASET',
            author: 'Tähti',
            cover: muistojaCover,
            coverposition: FurnitureSetCoverPosition.FULL,
            items: [
                {
                    num: 'F44',
                    type: types.COUCHES,
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
                    type: types.CHAIRS,
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
                    type: types.PLANTS,
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
                    type: types.PLANTS,
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
                    type: types.TABLES,
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
                    type: types.TABLES,
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
                    type: types.RUGS,
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
                    type: types.RUGS,
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
                    type: types.WALL,
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
                    type: types.WALL,
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
                    type: types.WALL,
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
                    type: types.WALL,
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
                    type: types.WALL,
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
                    type: types.ITEMS,
                    path: 'FOXTOY',
                    weight: 1,
                    cost: 70,
                    rarity: rarityList.RARE,
                    materials: [materials.FABRIC],
                    recycling: [recycles.GENERAL],
                    cover: muistojafox,
                },
            ],
        },
    };
};
