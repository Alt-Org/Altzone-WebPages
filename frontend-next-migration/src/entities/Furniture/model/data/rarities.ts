import { PieceRarity, Rarities } from '../../types/furniture';

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
