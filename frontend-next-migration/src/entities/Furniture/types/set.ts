import { StaticImageData } from 'next/image';

export enum FurnitureSet {
    TAAKKA = 'TAAKKA',
    NEURO = 'NEURO',
    RAKKAUS = 'RAKKAUS',
    SCRODINGER = 'SCRODINGER',
}

export enum Rarities {
    COMMON = 'COMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    ANTIQUE = 'ANTIQUE',
    NONE = 'NONE',
}
export interface PieceRarity {
    name: string;
    color: string;
    lightcolor: string;
    darkcolor: string;
    index: number;
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
    BEDS = 'BEDS',
}
export interface PieceType {}

export enum Materials {
    WOOD = 'WOOD',
    POLYESTER = 'POLYESTER',
    ALUMINIUM = 'ALUMINIUM',
    LEATHER = 'LEATHER',
    GLASS = 'GLASS',
    MELAMINE = 'MELAMINE',
    BOARD = 'BOARD',
    FABRIC = 'FABRIC',
    METAL = 'METAL',
    ELECTRONICS = 'ELECTRONICS',
    PORCELAIN = 'PORCELAIN',
    MGLASS = 'MGLASS',
    STEEL = 'STEEL',
}
export interface MaterialType {}
export enum Recycles {
    GENERAL = 'GENERAL',
    ELECTRONICS = 'ELECTRONICS',
    GLASS = 'GLASS',
    WOOD = 'WOOD',
    METAL = 'METAL',
    PLASTIC = 'PLASTIC',
    DUMP = 'DUMP',
}
export interface RecycleType {
    name: string;
}

export interface Piece {
    set?: SetInfo;
    cover?: StaticImageData | string;
    path: string;
    weight: number;
    cost: number;
    rarity: PieceRarity;
    type: PieceType;
    num: string;
    materials: Array<MaterialType>;
    recycling: Array<RecycleType>;
}
export interface SetInfo {
    id: string;
    path: string;
    author: string;
    coverposition: FurnitureSetCoverPosition;
    cover: StaticImageData | string;
    items: Piece[];
    disabled?: boolean;
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
