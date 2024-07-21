'use client';
import React, { useState } from 'react';
import cls from './WikiContentWithSideBar.module.scss';
import Image from 'next/image';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Mods } from '@/shared/lib/classNames/classNames';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ScrollTop } from '@/features/ScrollTop';
import NavbarSide from "@/shared/ui/NavbarSide/ui/NavbarSide";

interface Section {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  sidebarLogo: string;
  sidebarLogoAlt: string;
}

export type Props = {
  sections: Section[];
};

const WikiContentWithSideBar = (props: Props) => {
  const { sections = [] } = props;
  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();
  const [sidebarLogoError, setSidebarLogoError] = useState(false);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {},
  );

  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
  };

  const handleImageError = (id: string) => {
    setImageErrors((prevErrors) => ({ ...prevErrors, [id]: true }));
  };

  const sidebarLogo = sections.length > 0 ? sections[0].sidebarLogo : '';
  const sidebarLogoAlt = sections.length > 0 ? sections[0].sidebarLogoAlt : '';

  return (
    <div className={classNames(cls.pageContainer, combinedModCss)}>
      <div className={classNames(cls.mainContent, combinedModCss)}>
        {!isMobileSize && (
          <div className={classNames(cls.navbarSide, combinedModCss)}>
            <div className={classNames(cls.sidebarLogo, combinedModCss)}>
              {!sidebarLogoError ? (
                <Image
                  src={sidebarLogo}
                  className={cls.sectionLogo}
                  alt={sidebarLogoAlt}
                  height={100}
                  width={100}
                  onError={() => setSidebarLogoError(true)}
                />
              ) : null}
            </div>
            <NavbarSide sections={sections} />
          </div>
        )}
        <div className={classNames(cls.content, combinedModCss)} id='content'>
          {sections.length > 0 ? (
            sections.map((section) => (
              <div id={section.id} key={section.id} className={cls.section}>
                <h2>{section.label}</h2>
                <p
                  dangerouslySetInnerHTML={{ __html: section.description }}></p>
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
