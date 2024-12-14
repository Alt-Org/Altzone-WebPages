'use client';
import Image from 'next/image';
import { FurnitureCardsContainer, SetInfo } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './OneSetPage.module.scss';

export interface FurnitureOneSetPageProps {
    setInfo: SetInfo;
}

const OneSetPage = (props: FurnitureOneSetPageProps) => {
    const { setInfo: set } = props;
    const { t } = useClientTranslation('furnitureinfo');
    const { path, cover, author, items } = set;

    return (
        <>
            <div className={cls.Cover}>
                <Image
                    src={cover}
                    alt={t(`${path}.name`)}
                />
            </div>
            <div className={cls.Back}>
                <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {t('text-back')}</AppLink>
            </div>
            <h1>{t(`${path}.name`)}</h1>
            <h3>{author}</h3>
            <FurnitureCardsContainer items={items} />
        </>
    );
};

export default OneSetPage;
