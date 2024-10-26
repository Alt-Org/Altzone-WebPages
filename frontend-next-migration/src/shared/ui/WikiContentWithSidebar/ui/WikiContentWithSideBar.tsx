'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import NavbarSide from '@/shared/ui/NavbarSide/ui/NavbarSide';
import cls from './WikiContentWithSideBar.module.scss';

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

/**
 * WikiContentWithSideBar component renders a page with a sidebar containing sections
 * and a main content area with detailed information about each section.
 *
 * @param props - The props containing sections to display.
 * @returns The WikiContentWithSideBar component.
 *
 * @example
 * ```jsx
 * import React from 'react';
 * import WikiContentWithSideBar, { Section } from './WikiContentWithSideBar';
 *
 * const sections: Section[] = [
 *   {
 *     id: 'section1',
 *     label: 'Section 1',
 *     description: 'Description for section 1',
 *     image: 'image1.png',
 *     imageAlt: 'Image 1'
 *   },
 *   {
 *     id: 'section2',
 *     label: 'Section 2',
 *     description: 'Description for section 2',
 *     image: 'image2.png',
 *     imageAlt: 'Image 2'
 *   }
 * ];
 *
 * const App = () => (
 *   <WikiContentWithSideBar sections={sections} />
 * );
 *
 * export default App;
 * ```
 */
const WikiContentWithSideBar = (props: Props) => {
    const { sections = [] } = props;
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
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
        <div className={classNames(cls.pageContainer, combinedModCss)}>
            <div className={classNames(cls.mainContent, combinedModCss)}>
                {!isMobileSize && (
                    <div className={classNames(cls.navbarSide, combinedModCss)}>
                        <NavbarSide
                            sections={sections}
                            activeSection={activeSection}
                            setActiveSection={setActiveSection}
                        />
                    </div>
                )}
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
            {(isMobileSize || isTabletSize) && <ScrollTop />}
        </div>
    );
};

export default WikiContentWithSideBar;
