'use client';
import React, { useEffect, useState } from 'react';
import cls from './TableOfContents.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import useSizes from '@/shared/lib/hooks/useSizes';
import { DropdownWrapper } from '../../DropdownWrapperV2';

interface Section {
    id: string;
    label: string;
}

interface TableOfContentsProps {
    sections: Section[];
    className?: string;
    title?: string;
    dropdownClassName?: string;
}

/**
 * TableOfContents component that displays a navigation sidebar with clickable section labels.
 * Automatically highlights the active section based on scroll position.
 *
 * @param  props - The component props.
 * @param {Section[]} props.sections - Array of section objects with `id` and `label`.
 *
 * @example
 * const sections = [
 *   { id: 'section1', label: 'Section 1' },
 *   { id: 'section2', label: 'Section 2' },
 *   { id: 'section3', label: 'Section 3' },
 * ];
 * const [activeSection, setActiveSection] = useState('section1');
 *
 * <TableOfContents
 *   sections={sections}
 *   activeSection={activeSection}
 *   setActiveSection={setActiveSection}
 * />
 */
const TableOfContents: React.FC<TableOfContentsProps> = (props: TableOfContentsProps) => {
    const { sections, className, title, dropdownClassName } = props;
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;

    useEffect(() => {
        const handleScroll = () => {
            const sectionOffsets = sections.map((section) => {
                const element = document.getElementById(section.id);
                return { id: section.id, offsetTop: element ? element.offsetTop : 0 };
            });

            const currentScrollPosition = window.scrollY + window.innerHeight / 2; // Center of the viewport

            // Determine the current section based on the scroll position
            const currentSection = sectionOffsets.find((section, index) => {
                const nextSection = sectionOffsets[index + 1];
                if (
                    index === 0 &&
                    currentScrollPosition < (sectionOffsets[1]?.offsetTop || Infinity)
                ) {
                    // Special case for the first section
                    return currentScrollPosition >= section.offsetTop;
                }
                return (
                    currentScrollPosition >= section.offsetTop &&
                    (!nextSection || currentScrollPosition < nextSection.offsetTop)
                );
            });

            const firstSection = sectionOffsets[0];
            if (currentScrollPosition < firstSection.offsetTop + window.innerHeight / 2) {
                if (firstSection.id !== activeSection) {
                    setActiveSection(firstSection.id);
                }
            } else if (currentSection && currentSection.id !== activeSection) {
                setActiveSection(currentSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sections, activeSection, setActiveSection]);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offsetPosition = element.offsetTop - 10; // offset up
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
            setActiveSection(id);
        }
    };

    return !isTouchDevice ? (
        <div className={cls.navbarSideContainer}>
            <div className={classNames(cls.navbarSide, {}, [className ?? ''])}>
                {title && <h3 className={cls.sectionTitle}>{title}</h3>}
                <ul>
                    {sections.map((section) => (
                        <li
                            key={section.id}
                            className={activeSection === section.id ? cls.active : ''}
                            onClick={() => scrollToSection(section.id)}
                        >
                            {section.label}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    ) : (
        <div className={classNames('', {}, [className ?? ''])}>
            <DropdownWrapper
                contentClassName={classNames(cls.defaultDropdown, {}, [dropdownClassName ?? ''])}
                elements={sections.map((section) => ({
                    id: section.id,
                    elementText: section.label,
                    onClickCallback: () => {
                        scrollToSection(section.id);
                    },
                }))}
                dynamicTitle={title}
                isOpen={false}
                showArrow={true}
            />
        </div>
    );
};

export default TableOfContents;
