import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./SkeletonLoader.module.scss";
import React from "react";

interface SkeletonLoaderProps {
    numberOfRows?: number;
    sections?: number;
    className?: string;
    clan?: string;
    rating?: string;
    clanMaster?: string;
    members?: string;
    tag?: string;
    coins?: string;
    clansTitle?: string;
    numberOfCards?: number;
}

/**
 * SkeletonLoaderForClansDesktop component displays a skeleton loader for clans information on desktop devices.
 * It renders a specified number of skeleton rows and allows configuration of clan-related properties.
 *
 * @param {Object} props - Properties for the SkeletonLoaderForClansDesktop component.
 * @param {number} [props.numberOfRows=20] - The number of skeleton rows to render. Defaults to 20 rows.
 * @param {string} [props.rating=''] - Rating information to display in the skeleton loader.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the root container for custom styling.
 * @param {string} [props.clan=''] - Clan name to display in the skeleton loader.
 * @param {string} [props.clanMaster=''] - Clan master name to display in the skeleton loader.
 * @param {string} [props.coins=''] - Coin information to display in the skeleton loader.
 * @param {string} [props.members=''] - Clan member count to display in the skeleton loader.
 * @param {string} [props.tag=''] - Clan tag to display in the skeleton loader.
 * @param {string} [props.clansTitle=''] - Title to display at the top of the skeleton loader.
 * @returns {JSX.Element} A JSX element representing the skeleton loader for desktop with the specified properties.
 */
export const SkeletonLoaderForClansDesktop = ({
    numberOfRows = 20,
    rating = '',
    className = '',
    clan = '',
    clanMaster = '',
    coins = '',
    members = '',
    tag = '',
    clansTitle = '',
}: SkeletonLoaderProps) => {
    const skeletonRows = Array(numberOfRows).fill(0);
    return (
        <React.Fragment>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{clansTitle}</h1>
            <div className={classNames(cls.containerForClansDesktop, {}, [className])}>
                <div className={classNames(cls.topRowForClans)} >
                    <div className={cls.topRowHeader}><strong>{rating}</strong></div>
                    <div className={cls.topRowHeader}><strong>{clan}</strong></div>
                    <div className={cls.topRowHeader}><strong>{clanMaster}</strong></div>
                    <div className={cls.topRowHeader}><strong>{coins}</strong></div>
                    <div className={cls.topRowHeader}><strong>{members}</strong></div>
                    <div className={cls.topRowHeader}><strong>{tag}</strong></div>
                </div>

                {skeletonRows.map((_, rowIndex) => (
                    <div key={rowIndex} className={classNames(cls.skeletonContainerForClans)}>
                        <div className={classNames(cls.smallSkeletonForClans)}></div>
                        <div className={classNames(cls.skeletonForClans)}></div>
                        <div className={classNames(cls.skeletonForClans)}></div>
                        <div className={classNames(cls.smallSkeletonForClans)}></div>
                        <div className={classNames(cls.smallSkeletonForClans)}></div>
                        <div className={classNames(cls.skeletonForClans)}></div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

/**
 * SkeletonLoaderForMobile component displays a skeleton loader for clans information on mobile devices.
 * It renders a specified number of skeleton cards and allows configuration of clan-related properties.
 *
 * @param {Object} props - Properties for the SkeletonLoaderForMobile component.
 * @param {number} [props.numberOfCards=10] - The number of skeleton cards to render. Defaults to 10 cards.
 * @param {string} [props.rating=''] - Rating information to display in the skeleton loader.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the root container for custom styling.
 * @param {string} [props.clan=''] - Clan name to display in the skeleton loader.
 * @param {string} [props.clanMaster=''] - Clan master name to display in the skeleton loader.
 * @param {string} [props.coins=''] - Coin information to display in the skeleton loader.
 * @param {string} [props.members=''] - Clan member count to display in the skeleton loader.
 * @param {string} [props.tag=''] - Clan tag to display in the skeleton loader.
 * @param {string} [props.clansTitle=''] - Title to display at the top of the skeleton loader.
 * @returns {JSX.Element} A JSX element representing the skeleton loader for mobile with the specified properties.
 */
export const SkeletonLoaderForClansMobile = ({
    numberOfCards = 10,
    rating = '',
    className = '',
    clan = '',
    clanMaster = '',
    coins = '',
    members = '',
    tag = '',
    clansTitle = '',
}: SkeletonLoaderProps) => {
    const cards = Array(numberOfCards).fill(0);
    return (
        <React.Fragment>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>{clansTitle}</h1>
            <div className={classNames(cls.containerForClansMobile, {}, [className])}>
                {cards.map((_, rowIndex) => (
                    <div key={rowIndex} className={classNames(cls.skeletonCard)}>
                        <div className={cls.cardRow}><strong>{rating}:</strong> <div className={classNames(cls.skeletonForClans)}></div></div>
                        <div className={cls.cardRow}><strong>{clan}:</strong><div className={classNames(cls.skeletonForClans)}></div></div>
                        <div className={cls.cardRow}><strong>{coins}:</strong><div className={classNames(cls.skeletonForClans)}></div></div>
                        <div className={cls.cardRow}><strong>{tag}:</strong><div className={classNames(cls.skeletonForClans)}></div></div>
                        <div className={cls.cardRow}><strong>{members}:</strong><div className={classNames(cls.skeletonForClans)}></div></div>
                        <div className={cls.cardRow}><strong>{clanMaster}:</strong><div className={classNames(cls.skeletonForClans)}></div></div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};

/**
 * SkeletonLoaderWithHeader component displays a skeleton loader with sections, each containing a header and rows.
 * It can be used as a placeholder for loading content with a configurable number of sections.
 *
 * @param {Object} props - Properties for the SkeletonLoaderWithHeader component.
 * @param {number} [props.sections=1] - The number of sections (each containing a header and three rows) to render. Defaults to 1 section.
 * @param {string} [props.className=''] - Additional CSS class names to apply to the root container for custom styling.
 * @returns {JSX.Element} A JSX element representing the skeleton loader with headers and rows for each section.
 */
export const SkeletonLoaderWithHeader = ({
    sections = 1, 
    className = ''
}: SkeletonLoaderProps) => {
    const skeletonSections = Array(sections).fill(0);
    return (
        <div className={classNames(cls.skeletonContainer, {}, [className])}>
            {skeletonSections.map((_, sectionIndex) => (
                <React.Fragment key={sectionIndex}>
                    <div className={classNames(cls.skeletonHeaderContainer, {})}>
                        <div className={classNames(cls.skeletonHeader, {})} />
                    </div>
                    <div className={classNames(cls.skeleton)} />
                    <div className={classNames(cls.skeleton)} />
                    <div className={classNames(cls.skeleton)} />
                </React.Fragment>
            ))}
        </div>
    );
};
