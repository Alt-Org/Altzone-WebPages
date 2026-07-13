export type IGalleryDirectory = {
    name: string;
    type: 'directory';
    mtime: Date;
};

export type IGalleryPicture = {
    name: string;
};

export type ImageData = {
    src: string;
    width: number;
    height: number;
    blurDataURL?: string;
};

export interface CategoryTranslations {
    id: string;
    languages_code: string;
    category_id: string;
    name: string;
}

export interface Category {
    id: string;
    translations: CategoryTranslations[];
}

export interface PhotoObjectV2Translations {
    id: string;
    languages_code: string;
    photo_object_id: string;
    title?: string | null;
    description?: string | null;
}

export interface DirectusPhotoObjectV2 {
    id: string;
    category: Category | null;
    translations: PhotoObjectV2Translations[] | null;
    author: string | null;
    website: string | null;
    github: string | null;
    linkedin: string | null;
    instagram: string | null;
    facebook: string | null;
    image: string | null;
    image_2: string | null;
    image_3: string | null;
    animation: string | null;
    date_created: string;
}

export interface PhotoCategory {
    id: string;
    name?: string;
}

export interface PhotoObjectLink {
    name: 'github' | 'linkedin' | 'instagram' | 'facebook' | 'website';
    url: string;
}

export interface PhotoObject {
    author?: string;
    anchorId?: string;
    id: string;
    date_created: string;
    category: PhotoCategory;
    title?: string;
    description?: string;
    links: PhotoObjectLink[];
    frames?: string[][];
    animation?: string[];
}
