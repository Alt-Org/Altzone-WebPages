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
export enum Types {
    COUCHES = 'COUCHES',
    CHAIRS = 'CHAIRS',
    LIGHTS = 'LIGHTS',
    PLANTS = 'PLANTS',
    TABLES = 'TABLES',
    RUGS = 'RUGS',
    WALL = 'WALL',
    MIRRORS = 'MIRRORS',
    TOILETS = 'TOILETS',
    SINKS = 'SINKS',
    CABINETS = 'CABINETS',
}

export interface PieceRarity {
    name: string;
    color: string;
}
export interface PieceType {}

export interface Piece {
    set?: SetInfo;
    name: string;
    description: string;
    weight: number;
    cost: number;
    rarity: PieceRarity;
    type: PieceType;
    num: string;
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
