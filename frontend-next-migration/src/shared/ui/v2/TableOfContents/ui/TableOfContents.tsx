'use client';
import React, { useEffect, useState } from 'react';
import cls from './TableOfContents.module.scss';

interface Section {
    id: string;
    label: string;
}

interface TableOfContentsProps {
    sections: Section[];
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
const TableOfContents: React.FC<TableOfContentsProps> = ({ sections }) => {
    const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

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

    return (
        <div className={cls.navbarSideContainer}>
            <div className={cls.navbarSide}>
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
    );
};

export default TableOfContents;
