export interface MusicItem {
    musicTitle: string;
    artistName: string;
    youtubeId?: string;
}

export interface CollectionInfo {
    id: string;
    title: CollectionTitle;
    items?: MusicItem[];
}

export enum CollectionTitle {
    JUKEBOX = 'Jukebox',
    BATTLE = 'Battle',
}
