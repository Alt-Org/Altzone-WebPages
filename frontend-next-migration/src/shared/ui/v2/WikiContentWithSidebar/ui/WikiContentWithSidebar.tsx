'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import chevronDown from '@/shared/assets/icons/chevronDown.svg';
import cls from './WikiContentWithSidebar.module.scss';
import { TableOfContents } from '../../TableOfContents';

/**
 * Represents a section in the sidebar.
 */
interface Section {
    id: string;
    navMenuTitle: string;
    label: string;
    description: string;
    image: string;
    imageAlt: string;
}

export type Props = {
    sections: Section[];
    title: string;
    /**
     * Enables accordion mode for section content.
     * When true, sections are rendered as collapsible panels instead of always-expanding blocks.
     */
    enableAccordion?: boolean;
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
    const { sections = [], title, enableAccordion = false } = props;
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;

    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const contentHeights = useRef<{ [key: string]: string }>({});

    const combinedModCss: Mods = {
        [cls.isMobile]: isMobileSize,
        [cls.isTablet]: isTabletSize,
        [cls.isDesktop]: isDesktopSize,
        [cls.isWidescreen]: isWidescreenSize,
    };

    // Auto-expand section based on URL hash on mount
    useEffect(() => {
        if (!enableAccordion) return;
        const hash = window.location.hash.substring(1); // Remove '#' from hash
        if (hash && sections.some((section) => section.id === hash)) {
            setExpandedSections(new Set([hash]));
        }
    }, [sections, enableAccordion]);

    const handleImageError = (id: string) => {
        setImageErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    };

    const handleToggleSection = (sectionId: string) => {
        setExpandedSections((prevState) => {
            const newState = new Set(prevState);
            if (newState.has(sectionId)) {
                newState.delete(sectionId);
            } else {
                newState.add(sectionId);
            }
            return newState;
        });
    };

    return (
        <div className={classNames(cls.pageContainer, combinedModCss)}>
            <div className={classNames(cls.mainContent, combinedModCss)}>
                {!isTouchDevice && (
                    <div className={classNames(cls.navbarSide, combinedModCss)}>
                        <TableOfContents sections={sections} />
                    </div>
                )}
                <div
                    className={classNames(cls.content, combinedModCss)}
                    id="content"
                >
                    {title && <h1>{title}</h1>}
                    {sections.length > 0 ? (
                        sections.map((section) => {
                            const isExpanded = enableAccordion && expandedSections.has(section.id);
                            return enableAccordion ? (
                                <CollapsibleSectionWrapper
                                    key={section.id}
                                    section={section}
                                    isExpanded={isExpanded}
                                    onToggle={() => handleToggleSection(section.id)}
                                    imageErrors={imageErrors}
                                    onImageError={handleImageError}
                                    combinedModCss={combinedModCss}
                                />
                            ) : (
                                <div
                                    id={section.id}
                                    key={section.id}
                                    className={cls.section}
                                >
                                    <h2>{section.label}</h2>
                                    <p dangerouslySetInnerHTML={{ __html: section.description }} />
                                    {section.image && !imageErrors[section.id] && (
                                        <div
                                            className={classNames(cls.contentImage, combinedModCss)}
                                        >
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
                            );
                        })
                    ) : (
                        <p>No sections available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * Props for a single accordion section wrapper.
 *
 * The accordion wrapper manages the section's expanded/collapsed state,
 * renders the section header as a toggle button, and exposes the content area.
 */
interface CollapsibleSectionProps {
    section: Section;
    isExpanded: boolean;
    onToggle: () => void;
    imageErrors: { [key: string]: boolean };
    onImageError: (id: string) => void;
    combinedModCss: Mods;
}

/**
 * Renders a collapsible accordion section.
 *
 * When accordion mode is enabled, each section is wrapped in this component.
 * It controls the animated expand/collapse behavior and renders the section header,
 * body content, and optional image.
 *
 * @param props - The props for the collapsible section wrapper.
 * @returns The rendered collapsible section.
 */
const CollapsibleSectionWrapper = (props: CollapsibleSectionProps) => {
    const { section, isExpanded, onToggle, imageErrors, onImageError, combinedModCss } = props;
    const contentRef = useRef<HTMLDivElement>(null);
    const [maxHeight, setMaxHeight] = useState<string>('0px');

    // Update max-height based on expanded state
    useEffect(() => {
        if (isExpanded && contentRef.current) {
            const scrollHeight = contentRef.current.scrollHeight;
            setMaxHeight(`${scrollHeight}px`);
        } else {
            setMaxHeight('0px');
        }
    }, [isExpanded]);

    // Recalculate max-height on window resize
    useEffect(() => {
        const handleResize = () => {
            if (isExpanded && contentRef.current) {
                const scrollHeight = contentRef.current.scrollHeight;
                setMaxHeight(`${scrollHeight}px`);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isExpanded]);

    return (
        <div
            id={section.id}
            className={classNames(cls.collapsibleSection, {
                [cls.expanded]: isExpanded,
            })}
        >
            {/* Header Area */}
            <button
                onClick={onToggle}
                className={cls.sectionHeader}
                aria-expanded={isExpanded}
                aria-controls={`${section.id}-content`}
            >
                <h2 className={cls.sectionTitle}>{section.label}</h2>
                <div
                    className={classNames(cls.chevronIcon, {
                        [cls.rotated]: isExpanded,
                    })}
                >
                    <Image
                        src={chevronDown}
                        alt="Toggle section"
                        width={24}
                        height={24}
                    />
                </div>
            </button>

            {/* Content Area */}
            <div
                id={`${section.id}-content`}
                className={cls.sectionContent}
                style={{ maxHeight }}
            >
                <div
                    ref={contentRef}
                    className={cls.contentInner}
                >
                    <p dangerouslySetInnerHTML={{ __html: section.description }} />
                    {section.image && !imageErrors[section.id] && (
                        <div className={classNames(cls.contentImage, combinedModCss)}>
                            <Image
                                src={section.image}
                                className={cls.sectionImage}
                                alt={section.imageAlt}
                                height={600}
                                width={600}
                                onError={() => onImageError(section.id)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WikiContentWithSideBar;
