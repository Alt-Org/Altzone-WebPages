'use client';
import React, { useEffect } from 'react';
import cls from './NavbarSide.module.scss';

interface Section {
  id: string;
  label: string;
}

interface NavbarSideProps {
  sections: Section[];
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const NavbarSide: React.FC<NavbarSideProps> = ({
  sections,
  activeSection,
  setActiveSection,
}) => {
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
      if (
        currentScrollPosition <
        firstSection.offsetTop + window.innerHeight / 2
      ) {
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
              onClick={() => scrollToSection(section.id)}>
              {section.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavbarSide;
