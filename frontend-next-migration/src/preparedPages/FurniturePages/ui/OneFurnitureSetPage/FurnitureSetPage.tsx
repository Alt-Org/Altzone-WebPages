'use client';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { FurnitureManager, FurnitureCardsContainer } from '@/entities/Furniture';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './FurnitureSetPage.module.scss';

const OneSetPage = () => {
    const { id } = useParams();
    const { t } = useClientTranslation('furnitureinfo');

    const manager = new FurnitureManager();
    const set = manager.getFurnitureSet(id as string);

    if (!set) {
        return notFound();
    }

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
