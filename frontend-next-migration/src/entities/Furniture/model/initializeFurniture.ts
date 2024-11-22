import neuroCover from '@/shared/assets/images/furniture/neuro/NEURO_WEB.webp';
import taakkaCover from '@/shared/assets/images/furniture/taakka/TAAKKA_WEB.webp';
import rakkausCover from '@/shared/assets/images/furniture/rakkaus/RAKKAUS_WEB.png';
import rakkauscloset from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterKaappi.png';
import rakkausctable from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterKahvipöytä.png';
import rakkauslamp from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterLamppu.png';
import rakkauscarpet from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterMatto.png';
import rakkausarmchair from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterNojatuoli.png';
import rakkausmirror from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterPeili.png';
import rakkaustable from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterPöytä.png';
import rakkausbed from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterSänky.png';
import rakkaussofa from '@/shared/assets/images/furniture/rakkaus/posters/ShopPosterSohva.png';
import neuroclock from '@/shared/assets/images/furniture/neuro/posters/ShopPosterClockNeuro.png';
import neurochair from '@/shared/assets/images/furniture/neuro/posters/ShopPosterChairNeuro.png';
import neurostool from '@/shared/assets/images/furniture/neuro/posters/ShopPosterStoolNeuro.png';
import neurodrawer from '@/shared/assets/images/furniture/neuro/posters/ShopPosterDresserNeuro.png';
import taakkaarmchair from '@/shared/assets/images/furniture/taakka/posters/ShopPosterArmchairTaakka.png';
import taakkacloset from '@/shared/assets/images/furniture/taakka/posters/ShopPosterClosetTaakka.png';
import taakkamirror from '@/shared/assets/images/furniture/taakka/posters/ShopPosterMirrorTaakka.png';
import taakkalamp from '@/shared/assets/images/furniture/taakka/posters/ShopPosterFloorlampTaakka.png';
import taakkacouch from '@/shared/assets/images/furniture/taakka/posters/ShopPosterSofaTaakka.png';
import taakkastable from '@/shared/assets/images/furniture/taakka/posters/ShopPosterSidetableTaakka.png';
import taakkatable from '@/shared/assets/images/furniture/taakka/posters/ShopPosterCoffeetableTaakka.png';
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
};

export const initializeFurnitureSets = (): Record<FurnitureSet, SetInfo> => {
    return {
        [FurnitureSet.NEURO]: {
            id: 'neuro',
            path: 'NEUROSET',
            author: 'Simo Ryhänen',
            cover: neuroCover,
            coverposition: FurnitureSetCoverPosition.BOTTOMRIGHT,
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
            coverposition: FurnitureSetCoverPosition.BOTTOMRIGHT,
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
            coverposition: FurnitureSetCoverPosition.BOTTOM,
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
            ],
        },
        [FurnitureSet.SCRODINGER]: {
            id: 'scrodinger',
            path: 'SCRODINGERSET',
            author: 'SMKT',
            cover: '',
            disabled: true,
            coverposition: FurnitureSetCoverPosition.BOTTOM,
            items: [
                {
                    num: 'F20',
                    type: types.RUGS,
                    path: 'CARPET',
                    weight: 6,
                    cost: 150,
                    rarity: rarityList.NONE,
                    materials: [materials.FABRIC],
                    recycling: [recycles.GENERAL],
                },
                {
                    num: 'F20',
                    type: types.WALL,
                    path: 'MIRROR',
                    weight: 7,
                    cost: 150,
                    rarity: rarityList.NONE,
                    materials: [materials.MGLASS],
                    recycling: [recycles.GLASS],
                },
                {
                    num: 'F20',
                    type: types.TOILETS,
                    path: 'TOILET',
                    weight: 31,
                    cost: 150,
                    rarity: rarityList.NONE,
                    materials: [materials.PORCELAIN],
                    recycling: [recycles.DUMP],
                },
                {
                    num: 'F20',
                    type: types.SINKS,
                    path: 'SINK',
                    weight: 13,
                    cost: 150,
                    rarity: rarityList.NONE,
                    materials: [materials.PORCELAIN, materials.STEEL],
                    recycling: [recycles.DUMP],
                },
            ],
        },
    };
};
