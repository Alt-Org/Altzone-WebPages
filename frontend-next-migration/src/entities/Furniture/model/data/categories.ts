import { Category, PieceType } from '../../types/furniture';

export const categories: Record<Category, PieceType> = {
    [Category.CHAIRS]: { name: 'CHAIRS' },
    [Category.CABINETS]: { name: 'CABINETS' },
    [Category.COUCHES]: { name: 'COUCHES' },
    [Category.LIGHTS]: { name: 'LIGHTS' },
    [Category.PLANTS]: { name: 'PLANTS' },
    [Category.TABLES]: { name: 'TABLES' },
    [Category.RUGS]: { name: 'RUGS' },
    [Category.WALL]: { name: 'WALL' },
    [Category.MIRRORS]: { name: 'MIRRORS' },
    [Category.TOILETS]: { name: 'TOILETS' },
    [Category.SINKS]: { name: 'SINKS' },
    [Category.BEDS]: { name: 'BEDS' },
    [Category.ITEMS]: { name: 'ITEMS' },
    [Category.DECORATIONS]: { name: 'DECORATIONS' },
};

export default categories;
