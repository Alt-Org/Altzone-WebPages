'use client';
import React, { useState, useEffect } from 'react';
import cls from './NavbarSide.module.scss';

interface Section {
  id: string;
  label: string;
}

interface NavbarSideProps {
  sections: Section[];
}

const NavbarSide: React.FC<NavbarSideProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sectionOffsets = sections.map((section) => {
        const element = document.getElementById(section.id);
        return { id: section.id, offsetTop: element ? element.offsetTop : 0 };
      });

      const currentScrollPosition = window.scrollY + window.innerHeight / 2;

      const currentSection = sectionOffsets.find((section, index) => {
        const nextSection = sectionOffsets[index + 1];
        return (
          currentScrollPosition >= section.offsetTop &&
          (!nextSection || currentScrollPosition < nextSection.offsetTop)
        );
      });

      if (currentSection && currentSection.id !== activeSection) {
        console.log(`Active section updated: ${currentSection.id}`);
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial check to set the active section when the component mounts
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, activeSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition = element.offsetTop - 50; // offset up
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id); // Update the active section
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
