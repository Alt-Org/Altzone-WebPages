'use client';
import Image from 'next/image';
import { FurnitureCardsContainer, SetInfo } from '@/entities/Furniture';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './OneSetPage.module.scss';

export interface FurnitureOneSetPageProps {
    setInfo: SetInfo;
    header: string;
    textBack: string;
}

/**
 * Functional component that represents a detailed page displaying information about a furniture set.
 *
 * This component accepts the necessary properties to display the set's cover image, author, and associated items,
 * along with a header and a back navigation link. It renders the cover section, navigation link, title, author name,
 * and associated furniture items in a structured layout.
 *
 * @param {FurnitureOneSetPageProps} props - The properties required to display the furniture set page.
 * @param {Object} props.setInfo - The object containing detailed information about the furniture set.
 * @param {string} props.setInfo.cover - The image source for the set's cover image.
 * @param {string} props.setInfo.author - The author or creator of the furniture set.
 * @param {Array} props.setInfo.items - The list of items belonging to this furniture set.
 * @param {string} props.header - The main title for the furniture set page.
 * @param {string} props.textBack - The text label for the back navigation link.
 * @returns {JSX.Element} The rendered JSX structure representing the furniture set page.
 */
const OneSetPage = (props: FurnitureOneSetPageProps): JSX.Element => {
    const { setInfo: set, header, textBack } = props;
    const { cover, author, items } = set;
    return (
        <>
            <div className={cls.Cover}>
                <Image
                    src={cover}
                    alt={header + "'s cover"}
                />
            </div>
            <div className={cls.Back}>
                <AppLink to={getRouteAllFurnitureSetsPage()}>{textBack}</AppLink>
            </div>
            <h1 className={cls.title}>{header}</h1>
            <h3>{author}</h3>
            <FurnitureCardsContainer items={items} />
        </>
    );
};

export default OneSetPage;
