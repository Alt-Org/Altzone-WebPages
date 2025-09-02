import React from 'react';
import styles from './CollectionsPage.module.scss';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';

const CollectionsPage = () => {
    return (
        <div>
            <h1 className={styles.title}>Kokoelmat</h1>
            <DescriptionCard
                theme={DescriptionCardTheme.DEFENSEGALLERY}
                path="/collections/avatar"
            >
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>Avatar</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>Avatar-kokoelmat.</DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
            </DescriptionCard>

            <DescriptionCard
                theme={DescriptionCardTheme.DEFENSEGALLERY}
                path="/collections/furniture"
            >
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>Huonekalut</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>Huonekalu-kokoelmat.</DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
            </DescriptionCard>

            <DescriptionCard
                theme={DescriptionCardTheme.DEFENSEGALLERY}
                path="/collections/music"
            >
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>Musiikki</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>Musiikki-kokoelmat.</DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
            </DescriptionCard>
        </div>
    );
};

export default CollectionsPage;
