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

export interface PhotoVersionTranslations {
    id: string;
    languages_code: string;
    photo_version_id: string;
    altText: string;
}

export interface PhotoObjectTranslations {
    id: string;
    languages_code: string;
    photo_object_id: string;
    title?: string;
    author?: string;
    description?: string;
}

export interface Category {
    id: string;
    translations: CategoryTranslations[];
}

export interface PhotoVersion {
    id: string;
    image: string;
    width: number;
    height: number;
    altText: string;
}

export interface PhotoObject {
    title?: string;
    author?: string;
    description?: string;
    frames?: string[][];
    id?: string;
    category?: Category;
    translations?: PhotoObjectTranslations[];
    versions?: {
        preview: PhotoVersion;
        full: PhotoVersion;
    };
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
    image_1: string | null;
    image_2: string | null;
    image_3: string | null;
    animation: string | null;
    date_created: string;
}

export interface PhotoCategory {
    id: string;
    name?: string;
}

export interface PhotoObjectV2 {
    author?: string;
    id: string;
    date_created: string;
    category: PhotoCategory;
    title?: string;
    description?: string;
    links: {
        website?: string;
        github?: string;
        linkedin?: string;
        instagram?: string;
        facebook?: string;
    };
    frames?: string[][];
}
