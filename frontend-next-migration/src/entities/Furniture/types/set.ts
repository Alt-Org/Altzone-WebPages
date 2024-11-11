import { StaticImageData } from 'next/image';

export enum FurnitureSet {
    TAAKKA = 'TAAKKA',
    NEURO = 'NEURO',
    RAKKAUS = 'RAKKAUS',
}

export enum Rarities {
    COMMON = 'COMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    ANTIQUE = 'ANTIQUE',
}
export interface PieceRarity {
    name: string;
    color: string;
}

export interface Piece {
    id?: number;
    name: string;
    description: string;
    weight: number;
    cost: number;
    rarity: PieceRarity;
}
export interface SetInfo {
    id: string;
    name: string;
    author: string;
    coverposition: FurnitureSetCoverPosition;
    cover: StaticImageData | string;
    items: Piece[];
}

export enum FurnitureSetCoverPosition {
    BOTTOM = 'Bottom',
    BOTTOMLEFT = 'BottomLeft',
    BOTTOMRIGHT = 'BottomRight',
    TOP = 'Top',
    TOPLEFT = 'TopLeft',
    TOPRIGHT = 'TopRight',
    RIGHT = 'Right',
    LEFT = 'Left',
}
