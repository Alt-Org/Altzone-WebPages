import neuroCover from '@/shared/assets/images/furniture/neuro/NEURO_WEB.webp';
import taakkaCover from '@/shared/assets/images/furniture/taakka/TAAKKA_WEB.webp';
import rakkausCover from '@/shared/assets/images/furniture/rakkaus/RAKKAUS_WEB.png';
import {
    FurnitureSet,
    SetInfo,
    PieceRarity,
    Rarities,
    Types,
    FurnitureSetCoverPosition,
    PieceType,
} from '../types/set';

const rarityList: Record<Rarities, PieceRarity> = {
    [Rarities.COMMON]: {
        name: 'COMMON',
        color: '#8c8c8c',
    },
    [Rarities.RARE]: {
        name: 'RARE',
        color: '#fd4f3f',
    },
    [Rarities.EPIC]: {
        name: 'EPIC',
        color: '#8b61c5',
    },
    [Rarities.ANTIQUE]: {
        name: 'ANTIQUE',
        color: '#efbc37',
    },
};
const types: Record<Types, PieceType> = {
    [Types.CHAIRS]: {},
    [Types.CABINETS]: {},
    [Types.COUCHES]: {},
    [Types.LIGHTS]: {},
    [Types.PLANTS]: {},
    [Types.TABLES]: {},
    [Types.RUGS]: {},
    [Types.WALL]: {},
    [Types.MIRRORS]: {},
    [Types.TOILETS]: {},
    [Types.SINKS]: {},
};

export const initializeFurnitureSets = (
    t: (key: string) => string,
): Record<FurnitureSet, SetInfo> => {
    return {
        [FurnitureSet.NEURO]: {
            id: 'neuro',
            name: t('NEUROSET.name'),
            author: 'Simo Ryhänen',
            cover: neuroCover,
            coverposition: FurnitureSetCoverPosition.BOTTOMRIGHT,
            items: [
                {
                    name: t('NEUROSET.PIECES.CLOCK.name'),
                    description: t('NEUROSET.PIECES.CLOCK.desc'),
                    serial: t('NEUROSET.PIECES.CLOCK.serial'),
                    num: 'F30',
                    type: types.WALL,
                    weight: 1,
                    cost: 40,
                    rarity: rarityList.COMMON,
                },
                {
                    name: t('NEUROSET.PIECES.CHAIR.name'),
                    description: t('NEUROSET.PIECES.CHAIR.desc'),
                    serial: t('NEUROSET.PIECES.CHAIR.serial'),
                    num: 'R44.1',
                    type: types.CHAIRS,
                    weight: 10,
                    cost: 170,
                    rarity: rarityList.EPIC,
                },
                {
                    name: t('NEUROSET.PIECES.STOOL.name'),
                    description: t('NEUROSET.PIECES.STOOL.desc'),
                    serial: t('NEUROSET.PIECES.STOOL.serial'),
                    num: 'R41',
                    type: types.CHAIRS,
                    weight: 4,
                    cost: 40,
                    rarity: rarityList.COMMON,
                },
                {
                    name: t('NEUROSET.PIECES.DRAWER.name'),
                    description: t('NEUROSET.PIECES.DRAWER.desc'),
                    serial: t('NEUROSET.PIECES.DRAWER.serial'),
                    num: 'F41.1',
                    type: types.CABINETS,
                    weight: 24,
                    cost: 100,
                    rarity: rarityList.RARE,
                },
            ],
        },
        [FurnitureSet.TAAKKA]: {
            id: 'taakka',
            name: t('TAAKKASET.name'),
            author: 'Simo Ryhänen',
            cover: taakkaCover,
            coverposition: FurnitureSetCoverPosition.BOTTOMRIGHT,
            items: [],
        },
        [FurnitureSet.RAKKAUS]: {
            id: 'rakkaus',
            name: t('RAKKAUSSET.name'),
            author: 'IV',
            cover: rakkausCover,
            coverposition: FurnitureSetCoverPosition.BOTTOM,
            items: [],
        },
    };
};
