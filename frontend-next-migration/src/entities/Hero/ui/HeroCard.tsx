import React, { useState, useCallback, useRef, useEffect } from 'react';
import cls from './HeroCard.module.scss';
import Image from 'next/image';
import useResizeObserver, {
  ResizeCallback,
} from '@/shared/lib/hooks/useResizeObserver';
import { classNames } from '@/shared/lib/classNames/classNames';
import Popup from '@/shared/ui/Popup/Popup';
import HeroContainer from '@/entities/Hero/ui/HeroContainer/HeroContainer';
import ClickableBorder from '@/shared/ui/ClickableBorder/ClickableBorder';

type Props = {
  id: string;
  imageSrc: any;
  imageAlt: string;
  className?: string;
  backgroundColor?: string;
  heroGif: any;
  heroName: string;
  Description: string;
  group: string;
  title: string;
};

export const HeroCard = (props: Props) => {
  const {
    id,
    imageSrc,
    imageAlt,
    className = '',
    backgroundColor,
    heroGif,
    heroName,
    Description,
    group,
  } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTop, setPopupTop] = useState(0); // New state for popup top position

  const elementRef = useRef<HTMLDivElement>(null);

  const handleCardSizeUpdate: ResizeCallback<HTMLDivElement> = useCallback(
    (refCurrent) => {
      if (refCurrent) {
        const width = refCurrent.clientWidth;
        refCurrent.style.setProperty('--cardWidthLocal', `${width}px`);
      }
    },
    [],
  );

  useResizeObserver({ elementRef, callback: handleCardSizeUpdate });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isPopupOpen &&
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        setIsPopupOpen(false);
      }
    };

    if (isPopupOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopupOpen]);

  const openPopup = (event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setPopupTop(rect.top + window.scrollY); // Set popup top position based on click location
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={cls.HeroDiv} style={{ backgroundColor }}>
        <ClickableBorder
          ref={elementRef}
          borderImageSource='/images/hero-border3.png'
          className={classNames(cls.Wrapper, {}, [className])}
          onClick={openPopup}
          isPopupOpen={isPopupOpen}>
          <button onClick={openPopup} className={cls.HeroButton}>
            <Image src={imageSrc} alt={imageAlt} />
          </button>
        </ClickableBorder>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup} popupTop={popupTop}>
        <HeroContainer
          heroGif={heroGif}
          heroName={heroName}
          heroDescription={Description}
          group={group}
        />
      </Popup>
    </>
  );
};

HeroCard.displayName = 'HeroCard';
