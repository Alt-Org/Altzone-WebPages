import { CollectionInfo, CollectionTitle, MusicItem } from '../types/music';
import { initializeMusicCollections } from './initializeMusicCollections';

/**
 * Manages music collections and related operations.
 */
export class MusicManager {
    private musicCollections: Record<CollectionTitle, CollectionInfo>;

    constructor() {
        this.musicCollections = initializeMusicCollections();
    }

    /**
     * Retrieves all music collections.
     * @returns An array of all music collections.
     */
    public getAllCollections(): Array<CollectionInfo> {
        return Object.values(this.musicCollections);
    }

    /**
     * Retrieves all music items from all collections.
     * @returns An array of all music items.
     */
    public getAllCollectionsItems() {
        return Object.values(this.musicCollections).flatMap((collection) => collection.items || []);
    }
}
