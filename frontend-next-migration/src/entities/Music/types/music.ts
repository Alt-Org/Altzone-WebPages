export interface MusicItem {
    musicTitle: string;
    artistName: string;
    youtubeId?: string;
}

export interface CollectionInfo {
    name: CollectionName;
    items?: MusicItem[];
    slug: CollectionSlug;
}

export enum CollectionName {
    JUKEBOX = 'Jukebox',
    BATTLE = 'Battle',
}

export enum CollectionSlug {
    JUKEBOX = 'jukebox',
    BATTLE = 'battle',
}
