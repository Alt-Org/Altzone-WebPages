export interface Song {
    id: number;
    song_name: string;
    composers: string;
    category: SongCategory;
    video_link: string;
}
export interface SongCategory {
    id: number;
    category_name: string;
}
export interface MusicItem {
    id: number;
    musicTitle: string;
    artistName: string;
    youtubeId: string;
    category: string;
}
export interface CollectionInfo {
    name: string;
    slug: string;
    items: MusicItem[];
}

export enum CollectionName {
    JUKEBOX = 'Jukebox',
    BATTLE = 'Battle',
}

export enum CollectionSlug {
    JUKEBOX = 'jukebox',
    BATTLE = 'battle',
}
