'use client';
import React, { useState } from 'react';
import cls from './WikiContentWithSideBar.module.scss';
import Image from 'next/image';
import NavbarSide from '@/widgets/NavbarSide/ui/NavbarSide';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Mods } from '@/shared/lib/classNames/classNames';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ScrollTop } from '@/features/ScrollTop';

interface Section {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
}

export type Props = {
  sections: Section[];
  sidebarLogo: string; // Lisää tämä rivi
};

const WikiContentWithSideBar = (props: Props) => {
  const { sections = [], sidebarLogo } = props;
  const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } =
    useSizes();
  const [sidebarLogoError, setSidebarLogoError] = useState(false);

  const combinedModCss: Mods = {
    [cls.isMobile]: isMobileSize,
    [cls.isTablet]: isTabletSize,
    [cls.isDesktop]: isDesktopSize,
    [cls.isWidescreen]: isWidescreenSize,
  };

  return (
    <div className={classNames(cls.pageContainer, combinedModCss)}>
      <div className={classNames(cls.mainContent, combinedModCss)}>
        {!isMobileSize && (
          <div className={classNames(cls.navbarSide, combinedModCss)}>
            {sidebarLogo && !sidebarLogoError && (
              <div className={classNames(cls.sidebarLogo, combinedModCss)}>
                <Image
                  src={sidebarLogo}
                  alt='Sidebar Logo'
                  height={100}
                  width={100}
                  onError={() => setSidebarLogoError(true)}
                />
              </div>
            )}
            <NavbarSide sections={sections} />
          </div>
        )}
        <div className={classNames(cls.content, combinedModCss)} id='content'>
          {sections.length > 0 ? (
            sections.map((section) => {
              const [imageError, setImageError] = useState(false);

              return (
                <div id={section.id} key={section.id} className={cls.section}>
                  <h2>{section.label}</h2>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: section.description,
                    }}></p>
                  {section.image && !imageError && (
                    <div
                      className={classNames(cls.contentImage, combinedModCss)}>
                      <Image
                        src={section.image}
                        className={cls.sectionImage}
                        alt={section.imageAlt}
                        height={300}
                        width={600}
                        onError={() => setImageError(true)}
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
      {(isMobileSize || isTabletSize) && <ScrollTop />}
    </div>
  );
};

export default WikiContentWithSideBar;
