import { Materials, MaterialType } from '../../types/furniture';

export const materials: Record<Materials, MaterialType> = {
    [Materials.WOOD]: { name: 'WOOD' },
    [Materials.POLYESTER]: { name: 'POLYESTER' },
    [Materials.ALUMINIUM]: { name: 'ALUMINIUM' },
    [Materials.LEATHER]: { name: 'LEATHER' },
    [Materials.GLASS]: { name: 'GLASS' },
    [Materials.MELAMINE]: { name: 'MELAMINE' },
    [Materials.BOARD]: { name: 'BOARD' },
    [Materials.FABRIC]: { name: 'FABRIC' },
    [Materials.METAL]: { name: 'METAL' },
    [Materials.ELECTRONICS]: { name: 'ELECTRONICS' },
    [Materials.PORCELAIN]: { name: 'PORCELAIN' },
    [Materials.MGLASS]: { name: 'MGLASS' },
    [Materials.STEEL]: { name: 'STEEL' },
    [Materials.PLASTIC]: { name: 'PLASTIC' },
    [Materials.CLAY]: { name: 'CLAY' },
    [Materials.PLANT]: { name: 'PLANT' },
    [Materials.PAPER]: { name: 'PAPER' },
    [Materials.WAX]: { name: 'WAX' },
};
