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
import Heroes from '../model/heroes';
import img from '@/shared/assets/images/altLogo.png';

type Props = {
  id: string;
  imageSrc: any;
  imageAlt: string;
  className?: string;
  backgroundColor?: string;
  heroImg: string;
  heroGif: any;
  heroImgAlt: string;
  heroName: string;
  heroDescription: string;
  group: string;
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
    heroDescription,
    group,
  } = props;

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
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
      <Popup className={cls.popup} isOpen={isPopupOpen} onClose={closePopup}>
        <div
          className={`${cls.HeroInfoDiv} ${isHovered ? cls.hovered : ''}`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <HeroContainer
            heroGif={heroGif}
            heroName={heroName}
            heroDescription={heroDescription}
            group={group}
          />
        </div>
      </Popup>
    </>
  );
};

HeroCard.displayName = 'HeroCard';
