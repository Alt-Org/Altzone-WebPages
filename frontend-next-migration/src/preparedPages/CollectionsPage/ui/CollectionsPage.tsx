'use client';
import React from 'react';
import cls from './CollectionsPage.module.scss';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import kipu from '@/shared/assets/images/furniture/KIPU_WEB.webp';
import music from '@/shared/assets/images/gallery/MusicCollection.png';
import kipuMobile from '@/shared/assets/images/furniture/Kipu_mobile.png';
import musicMobile from '@/shared/assets/images/furniture/Music_mobile.png';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { CollectionsNavMenuAsDropdown } from '@/features/NavigateCollections';
import { PageTitle } from '@/shared/ui/PageTitle';

const CollectionsPage = () => {
    const { t } = useClientTranslation('collections');
    const { isMobileSize, isTabletSize } = useSizes();
    const isSmallScreen = isMobileSize || isTabletSize;

    return (
        <div className={cls.Container}>
            <PageTitle
                titleText={t('collections-title')}
                alternate={true}
                searchVisible={false}
            />
            {isSmallScreen && <CollectionsNavMenuAsDropdown isMobileSize={isSmallScreen} />}

            <DescriptionCard
                theme={DescriptionCardTheme.COLLECTIONS}
                path="/collections/furniture"
                isExternal={false}
                withScalableLink={true}
                className="FurnitureCard"
            >
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>{t('furniture')}</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        {t('furniture-collections')}
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image width={isSmallScreen ? '60%' : '52%'}>
                    <DescriptionCard.Image.Image
                        src={isSmallScreen ? kipuMobile : kipu}
                        alt="furniture collection"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>

            <DescriptionCard
                theme={DescriptionCardTheme.COLLECTIONS}
                path="/collections/music"
                isExternal={false}
                withScalableLink={true}
                className="MusicCard"
            >
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>{t('music')}</DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        {t('music-collections')}
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image width={isSmallScreen ? '60%' : '52%'}>
                    <DescriptionCard.Image.Image
                        src={isSmallScreen ? musicMobile : music}
                        alt="music collection"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
        </div>
    );
};

export default CollectionsPage;
