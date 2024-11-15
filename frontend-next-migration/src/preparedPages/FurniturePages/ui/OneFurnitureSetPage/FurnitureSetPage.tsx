'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FurnitureManager, PieceCard } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import cls from './FurnitureSetPage.module.scss';
import { Container } from '@/shared/ui/Container';
import Image from 'next/image';
import { Piece } from '@/entities/Furniture/types/set';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';

type Props = {
    params: { id: string };
};

const OneSetPage = (props: Props) => {
    const { id } = props.params;

    const { t } = useClientTranslation('furnitureinfo');

    const manager = new FurnitureManager();

    const set = manager.getFurnitureSet(id);

    const { path, cover, author, items } = set;

    return (
        <div className={classNames(cls.SetPage)}>
            <Container className={cls.Container}>
                <div className={cls.Cover}>
                    <Image
                        src={cover}
                        alt={'cover'}
                    />
                </div>
                <div className={cls.Back}>
                    <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- Takaisin</AppLink>
                </div>
                <h1>{t(`${path}.name`)}</h1>
                <h3>{author}</h3>
                <div className={cls.CardsContainer}>
                    {items.map((item: Piece) => {
                        return (
                            <PieceCard
                                item={item}
                                setpath={path}
                                t={t}
                                key={item.path}
                            />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

export default OneSetPage;
