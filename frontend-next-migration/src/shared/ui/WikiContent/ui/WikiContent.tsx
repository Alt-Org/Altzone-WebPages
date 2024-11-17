'use client';
import Image from 'next/image';
import { useState } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './WikiContent.module.scss';

/**
 * Represents a section in the sidebar.
 */
interface Section {
    id: string;
    label: string;
    description: string;
    image: string;
    imageAlt: string;
}

export type Props = {
    sections: Section[];
};

const WikiContent = (props: Props) => {
    const { sections = [] } = props;
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();

    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };

    const handleImageError = (id: string) => {
        setImageErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    };

    return (
        <div className={classNames(cls.mainContent, combinedModCss)}>
            <div
                className={classNames(cls.content, combinedModCss)}
                id="content"
            >
                {sections.length > 0 ? (
                    sections.map((section) => (
                        <div
                            id={section.id}
                            key={section.id}
                            className={cls.section}
                        >
                            <h2>{section.label}</h2>
                            <p dangerouslySetInnerHTML={{ __html: section.description }} />
                            {section.image && !imageErrors[section.id] && (
                                <div className={classNames(cls.contentImage, combinedModCss)}>
                                    <Image
                                        src={section.image}
                                        className={cls.sectionImage}
                                        alt={section.imageAlt}
                                        height={600}
                                        width={600}
                                        onError={() => handleImageError(section.id)}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No sections available.</p>
                )}
            </div>
        </div>
    );
};

export default WikiContent;
