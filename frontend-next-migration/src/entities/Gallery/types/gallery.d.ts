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
    description?: string;
    subDescription?: string;
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
    description?: string;
    subDescription?: string;
    frames?: string[][];
    id?: string;
    category?: Category;
    translations?: PhotoObjectTranslations[];
    versions?: {
        preview: PhotoVersion;
        full: PhotoVersion;
    };
}
