'use client';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import { classNames } from '@/shared/lib/classNames/classNames';
import chevronDown from '@/shared/assets/icons/chevronDown.svg';
import cls from './Privacy.module.scss';

interface Section {
    id: string;
    navMenuTitle: string;
    label: string;
    description: string;
    image: string;
    imageAlt: string;
    sidebarLogo: string;
    sidebarLogoAlt: string;
}

export type Props = {
    sections: Section[];
    title: string;
    pageDescription?: string;
    infoBox?: string;
};

/**
 * Privacy Policy page component that displays privacy policy content
 * with accordion-style sections
 *
 * @param props - Component props
 * @param props.sections - Array of privacy policy sections
 * @param props.title - Main page title
 * @param props.pageDescription - Optional description shown above sections
 * @returns JSX element representing the privacy policy page
 */
const PrivacyPage = (props: Props) => {
    const { sections = [], title, pageDescription, infoBox } = props;
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

    // Auto-expand section based on URL hash on mount
    useEffect(() => {
        const hash = window.location.hash.substring(1); // Remove '#' from hash
        if (hash && sections.some((section) => section.id === hash)) {
            setExpandedSections(new Set([hash]));
        }
    }, [sections]);

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

    const handleImageError = (id: string) => {
        setImageErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
    };

    return (
        <div className={classNames(cls.pageContainer)}>
            <h1 className={cls.pageTitle}>{title}</h1>
            {infoBox && (
                <div className={cls.infoBox}>
                    <p dangerouslySetInnerHTML={{ __html: infoBox }} />
                </div>
            )}
            <div className={classNames(cls.accordionContainer)}>
                {pageDescription && (
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: pageDescription }} />
                    </div>
                )}
                <div className={cls.accordionWrapper}>
                    {sections.length > 0 ? (
                        sections.map((section) => (
                            <AccordionSection
                                key={section.id}
                                section={section}
                                isExpanded={expandedSections.has(section.id)}
                                onToggle={() => handleToggleSection(section.id)}
                                imageErrors={imageErrors}
                                onImageError={handleImageError}
                            />
                        ))
                    ) : (
                        <p>No sections available.</p>
                    )}
                </div>
            </div>
            <ScrollTop />
        </div>
    );
};

interface AccordionSectionProps {
    section: Section;
    isExpanded: boolean;
    onToggle: () => void;
    imageErrors: { [key: string]: boolean };
    onImageError: (id: string) => void;
}

const AccordionSection = (props: AccordionSectionProps) => {
    const { section, isExpanded, onToggle, imageErrors, onImageError } = props;
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
                        <div className={cls.contentImage}>
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

export default PrivacyPage;
