export interface ComicPage {
    id: number;
    Comics_id: number;
    directus_files_id: string;
    order: number;
}

export interface Comics {
    id: number;
    status: 'draft' | 'published' | 'archived' | null;
    sort: number;
    date_created: string;
    date_updated: string | null;
    title: string;
    author: string | null;
    pages: ComicPage[]; // this is a collection of files/file ids
    cover_image: string | null; // use first page if not set
    translations: {
        fi: {
            title: string;
        };
        en: {
            title: string;
        };
    };
}

export type ComicReaderProps = {
    title?: string;
    followLastImage?: boolean;
    sources: string[];
    cover: {
        name: string;
        url: string;
    };
};
