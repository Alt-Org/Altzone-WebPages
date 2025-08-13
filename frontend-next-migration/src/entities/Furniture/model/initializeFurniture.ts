import neuroCover from '@/shared/assets/images/furniture/neuro/cover.png';
import taakkaCover from '@/shared/assets/images/furniture/taakka/cover.png';
import rakkausCover from '@/shared/assets/images/furniture/rakkaus/cover.png';
import muistojaCover from '@/shared/assets/images/furniture/muistoja/cover.png';
import neuroCoverWebp from '@/shared/assets/images/furniture/neuro/cover.webp';
import taakkaCoverWebp from '@/shared/assets/images/furniture/taakka/cover.webp';
import rakkausCoverWebp from '@/shared/assets/images/furniture/rakkaus/cover.webp';
import muistojaCoverWebp from '@/shared/assets/images/furniture/muistoja/cover.webp';
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
import neuroclock from '@/shared/assets/images/furniture/neuro/posters/clock.webp';
import neurochair from '@/shared/assets/images/furniture/neuro/posters/chair.webp';
import neurostool from '@/shared/assets/images/furniture/neuro/posters/stool.webp';
import neurodrawer from '@/shared/assets/images/furniture/neuro/posters/drawer.webp';
import taakkaarmchair from '@/shared/assets/images/furniture/taakka/posters/armchair.webp';
import taakkacloset from '@/shared/assets/images/furniture/taakka/posters/closet.webp';
import taakkamirror from '@/shared/assets/images/furniture/taakka/posters/mirror.webp';
import taakkalamp from '@/shared/assets/images/furniture/taakka/posters/lamp.webp';
import taakkacouch from '@/shared/assets/images/furniture/taakka/posters/sofa.webp';
import taakkastable from '@/shared/assets/images/furniture/taakka/posters/sidetable.webp';
import taakkatable from '@/shared/assets/images/furniture/taakka/posters/coffeetable.webp';
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
import {
    FurnitureSet,
    SetInfo,
    PieceRarity,
    Rarities,
    Category,
    FurnitureSetCoverPosition,
    PieceType,
    Materials,
    MaterialType,
    Recycles,
    RecycleType,
} from '../types/furniture';

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
export const categories: Record<Category, PieceType> = {
    [Category.CHAIRS]: {
        name: 'CHAIRS',
    },
    [Category.CABINETS]: {
        name: 'CABINETS',
    },
    [Category.COUCHES]: {
        name: 'COUCHES',
    },
    [Category.LIGHTS]: {
        name: 'LIGHTS',
    },
    [Category.PLANTS]: {
        name: 'PLANTS',
    },
    [Category.TABLES]: {
        name: 'TABLES',
    },
    [Category.RUGS]: {
        name: 'RUGS',
    },
    [Category.WALL]: {
        name: 'WALL',
    },
    [Category.MIRRORS]: {
        name: 'MIRRORS',
    },
    [Category.TOILETS]: {
        name: 'TOILETS',
    },
    [Category.SINKS]: {
        name: 'SINKS',
    },
    [Category.BEDS]: {
        name: 'BEDS',
    },
    [Category.ITEMS]: {
        name: 'ITEMS',
    },
    [Category.DECORATIONS]: {
        name: 'DECORATIONS',
    },
};
export const materials: Record<Materials, MaterialType> = {
    [Materials.WOOD]: {
        name: 'WOOD',
    },
    [Materials.POLYESTER]: {
        name: 'POLYESTER',
    },
    [Materials.ALUMINIUM]: {
        name: 'ALUMINIUM',
    },
    [Materials.LEATHER]: {
        name: 'LEATHER',
    },
    [Materials.GLASS]: {
        name: 'GLASS',
    },
    [Materials.MELAMINE]: {
        name: 'MELAMINE',
    },
    [Materials.BOARD]: {
        name: 'BOARD',
    },
    [Materials.FABRIC]: {
        name: 'FABRIC',
    },
    [Materials.METAL]: {
        name: 'METAL',
    },
    [Materials.ELECTRONICS]: {
        name: 'ELECTRONICS',
    },
    [Materials.PORCELAIN]: {
        name: 'PORCELAIN',
    },
    [Materials.MGLASS]: {
        name: 'MGLASS',
    },
    [Materials.STEEL]: {
        name: 'STEEL',
    },
    [Materials.PLASTIC]: {
        name: 'PLASTIC',
    },
    [Materials.CLAY]: {
        name: 'CLAY',
    },
    [Materials.PLANT]: {
        name: 'PLANT',
    },
    [Materials.PAPER]: {
        name: 'PAPER',
    },
    [Materials.WAX]: {
        name: 'WAX',
    },
};
export const recycles: Record<Recycles, RecycleType> = {
    [Recycles.GENERAL]: {
        name: 'GENERAL',
    },
    [Recycles.ELECTRONICS]: {
        name: 'ELECTRONICS',
    },
    [Recycles.GLASS]: {
        name: 'GLASS',
    },
    [Recycles.WOOD]: {
        name: 'WOOD',
    },
    [Recycles.METAL]: {
        name: 'METAL',
    },
    [Recycles.PLASTIC]: {
        name: 'PLASTIC',
    },
    [Recycles.DUMP]: {
        name: 'DUMP',
    },
    [Recycles.BIOWASTE]: {
        name: 'BIOWASTE',
    },
    [Recycles.PAPER]: {
        name: 'PAPER',
    },
};

export const initializeFurnitureSets = (): Record<FurnitureSet, SetInfo> => {
    return {
        [FurnitureSet.NEURO]: {
            id: 'neuro',
            path: 'NEUROSET',
            author: 'Simo Ryhänen',
            cover: neuroCover,
            coverWebp: neuroCoverWebp,
            //todo should be fixed, idk why we should hardcode it
            coverposition: FurnitureSetCoverPosition.SMALL,
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
        },
        [FurnitureSet.TAAKKA]: {
            id: 'taakka',
            path: 'TAAKKASET',
            author: 'Simo Ryhänen',
            cover: taakkaCover,
            coverWebp: taakkaCoverWebp,
            //todo should be fixed, idk why we should hardcode it
            coverposition: FurnitureSetCoverPosition.SMALL,
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
        },
        [FurnitureSet.RAKKAUS]: {
            id: 'rakkaus',
            path: 'RAKKAUSSET',
            author: 'IV',
            cover: rakkausCover,
            coverWebp: rakkausCoverWebp,
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
        },
        [FurnitureSet.MUISTOJA]: {
            id: 'muistoja',
            path: 'MUISTOJASET',
            author: 'Tähti',
            cover: muistojaCover,
            coverWebp: muistojaCoverWebp,
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
        },
    };
};
