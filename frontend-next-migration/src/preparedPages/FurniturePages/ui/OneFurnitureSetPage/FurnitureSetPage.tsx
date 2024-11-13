'use client';
import { classNames } from '@/shared/lib/classNames/classNames';
import { FurnitureManager, PieceCard } from '@/entities/Furniture';
import { useClientTranslation } from '@/shared/i18n';
import cls from './FurnitureSetPage.module.scss';
import { Container } from '@/shared/ui/Container';
import Image from 'next/image';
import { Piece } from '@/entities/Furniture/types/set';

type Props = {
    params: { id: string };
};

const OneSetPage = (props: Props) => {
    const { id } = props.params;

    const { t } = useClientTranslation('furnitureset');

    const manager = new FurnitureManager(t);

    const set = manager.getFurnitureSet(id);

    const { name, cover, author, items } = set;

    return (
        <div className={classNames(cls.SetPage)}>
            <Container className={cls.Container}>
                <div className={cls.Cover}>
                    <Image
                        src={cover}
                        alt={'cover'}
                    />
                </div>
                <h1>{t(name)}</h1>
                <h3>{author}</h3>
                <div className={cls.CardsContainer}>
                    {items.map((item: Piece) => {
                        return (
                            <PieceCard
                                item={item}
                                t={t}
                                key={item.name}
                            />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

export default OneSetPage;
