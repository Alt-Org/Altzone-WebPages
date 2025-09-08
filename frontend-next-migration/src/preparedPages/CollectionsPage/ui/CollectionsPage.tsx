import React from 'react';
import styles from './CollectionsPage.module.scss';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import kipu from '@/shared/assets/images/furniture/KIPU_WEB.webp';
import music from '@/shared/assets/images/gallery/MusicCollection.png';

const CollectionsPage = () => {
    return (
        <div>
            <h1 className={styles.title}>Kokoelmat</h1>

            <DescriptionCard
                theme={DescriptionCardTheme.COLLECTIONS}
                path="/collections/furniture"
            >
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>Huonekalut</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>Huonekalu-kokoelmat.</DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image width="51%">
                    <DescriptionCard.Image.Image
                        src={kipu}
                        alt="furniture collection"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>

            <DescriptionCard
                theme={DescriptionCardTheme.COLLECTIONS}
                path="/collections/music"
            >
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>Musiikki</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>Musiikki-kokoelmat.</DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image width="51%">
                    <DescriptionCard.Image.Image
                        src={music}
                        alt="music collection"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
        </div>
    );
};

export default CollectionsPage;
