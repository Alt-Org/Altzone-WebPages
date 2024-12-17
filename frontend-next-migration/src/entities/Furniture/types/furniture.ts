import { StaticImageData } from 'next/image';

export enum FurnitureSet {
    TAAKKA = 'TAAKKA',
    NEURO = 'NEURO',
    RAKKAUS = 'RAKKAUS',
    MUISTOJA = 'MUISTOJA',
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

export enum Category {
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
    ITEMS = 'ITEMS',
}
export interface PieceType {
    name: string;
}

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
    PLASTIC = 'PLASTIC',
    CLAY = 'CLAY',
    PLANT = 'PLANT',
    PAPER = 'PAPER',
    WAX = 'WAX',
}
export interface MaterialType {
    name: string;
}
export enum Recycles {
    GENERAL = 'GENERAL',
    ELECTRONICS = 'ELECTRONICS',
    GLASS = 'GLASS',
    WOOD = 'WOOD',
    METAL = 'METAL',
    PLASTIC = 'PLASTIC',
    DUMP = 'DUMP',
    BIOWASTE = 'BIOWASTE',
    PAPER = 'PAPER',
}
export interface RecycleType {
    name: string;
}

export interface Piece {
    set?: SetInfo;
    cover: StaticImageData | string;
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
    cover: StaticImageData | string;
    author: string;
    coverposition: FurnitureSetCoverPosition;
    items: Piece[];
    disabled?: boolean;
    key?: string;
}

export enum FurnitureSetCoverPosition {
    FULL = 'Full',
    MEDIUM = 'Medium',
    SMALL = 'Small',
}

export interface SetTranslation {
    name: string;
    items: Record<string, PieceTranslation>;
    unknown: PieceTranslation;
}
export interface PieceTranslation {
    name: string;
    desc: string;
}
export interface MaterialTranslation {
    name: string;
}
