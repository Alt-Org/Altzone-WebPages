export interface News {
    id: number;
    name: string;
    date: string;
    category: string;
    title: string;
    previewText: string;
    body_text: string;
    footnotes: string;
    titlePicture: string;
    extraPicture: string | null;
    extraPicture2: string | null;
    extraPicture3: string | null;
    extraPicture4: string | null;
    language?: string;
    translations?: NewsTranslation[];
}

export interface Category {
    id: number;
    name: string;
    translations: CategoryTranslation[];
}
