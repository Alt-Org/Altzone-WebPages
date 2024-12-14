'use client';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FurnitureManager, FurnitureCardsContainer } from '@/entities/Furniture';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './FurnitureSetPage.module.scss';

const NotFound = () => {
    return (
        <Container>
            <h1>Set not found</h1>
            <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- Back to all sets</AppLink>
        </Container>
    );
};

const OneSetPage = () => {
    const { id } = useParams();
    const { t } = useClientTranslation('furnitureinfo');

    const manager = new FurnitureManager();
    const set = manager.getFurnitureSet(id as string);

    if (!set) {
        return <NotFound />;
    }

    const { path, cover, author, items } = set;

    return (
        <div className={classNames(cls.SetPage)}>
            <Container className={cls.Container}>
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
            </Container>
        </div>
    );
};

export default OneSetPage;
