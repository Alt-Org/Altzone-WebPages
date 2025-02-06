export interface News {
    id: number;
    status: string;
    user_created: string;
    date_created: string;
    user_updated: string | null;
    date_updated: string | null;
    date: string;
    translations: NewsTranslation[];
    category: Category;
    titlePicture: MediaFile;
    extrapicture: MediaFile;
    extraPicture2: MediaFile | null;
    extraPicture3: MediaFile | null;
    extraPicture4: MediaFile | null;
}

export interface NewsTranslation {
    id: number;
    news_id: number;
    languages_code: string;
    title: string;
    preview_text: string;
    body_text: string;
    footnotes: string | null;
}

export interface Category {
    id: number;
    status: string;
    user_created: string;
    date_created: string;
    user_updated: string | null;
    date_updated: string | null;
    category_image: string; // ID or URL of the image
    translations: CategoryTranslation[];
}

export interface CategoryTranslation {
    id: number;
    news_category_id: number;
    languages_code: string;
    category: string;
}

export interface MediaFile {
    id: string;
    storage: string;
    filename_disk: string;
    filename_download: string;
    title: string;
    type: string;
    folder: string;
    uploaded_by: string;
    created_on: string;
    modified_by: string | null;
    modified_on: string | null;
    filesize: string;
    width: number;
    height: number;
    duration: string | null;
    embed: string | null;
    description: string | null;
    location: string | null;
    tags: string | null;
    metadata: Record<string, any>;
    focal_point_x: number | null;
    focal_point_y: number | null;
    tus_id: string | null;
    tus_data: string | null;
    uploaded_on: string;
}
