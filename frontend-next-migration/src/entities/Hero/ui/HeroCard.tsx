'use client';
import React, { useState, useCallback, useRef } from 'react'; // Lisätty useState
import cls from './HeroCard.module.scss';
import Image from 'next/image';
import { AppRoutesLinks, RoutePaths } from '@/shared/appLinks/RoutePaths';
import { ClickableBorder } from '@/shared/ui/ClickableBorder';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import useResizeObserver, {
  ResizeCallback,
} from '@/shared/lib/hooks/useResizeObserver';
import Popup from '@/shared/ui/Popup/Popup';

type Props = {
  id: string;
  imageSrc: any;
  imageAlt: string;
  className?: string;
  backgroundColor?: string;
};

export const HeroCard = (props: Props) => {
  const { id, imageSrc, imageAlt, className = '', backgroundColor } = props;
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Lisätty tilamuuttuja

  const elementRef = useRef(null);

  const handleCardSizeUpdate: ResizeCallback<HTMLDivElement> = useCallback(
    (refCurrent) => {
      const width = refCurrent.clientWidth;
      refCurrent.style.setProperty('--cardWidthLocal', `${width}px`);
    },
    [],
  );

  useResizeObserver({ elementRef, callback: handleCardSizeUpdate });

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={cls.HeroDiv} style={{ backgroundColor }}>
        <button onClick={openPopup}>
          <Image src={imageSrc} alt={imageAlt} className={cls.HeroImg} />
        </button>
      </div>
      <Popup isOpen={isPopupOpen} onClose={closePopup}>
        {' '}
        {/* Lisätty isOpen ja onClose propsit */}
        {/* Popup-sisältö tässä */}
        <div>
          <p>Tähän voit lisätä popup-ikkunan sisällön</p>
        </div>
      </Popup>
    </>
  );
};

HeroCard.displayName = 'HeroCard';
