import neuroCover from '@/shared/assets/images/furniture/neuro/NEURO_WEB.webp';
import taakkaCover from '@/shared/assets/images/furniture/taakka/TAAKKA_WEB.webp';
import rakkausCover from '@/shared/assets/images/furniture/rakkaus/RAKKAUS_WEB.png';
import {
    FurnitureSet,
    SetInfo,
    PieceRarity,
    Rarities,
    FurnitureSetCoverPosition,
} from '../types/set';

const rarityList: Record<Rarities, PieceRarity> = {
    [Rarities.COMMON]: {
        name: 'COMMON',
        color: '#ffffff',
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
                    weight: 1,
                    cost: 40,
                    rarity: rarityList.COMMON,
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
