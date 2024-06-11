import React, { useEffect, useState } from 'react';
import cls from './popup.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Popup = ({ isOpen, onClose, children }: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollY, setScrollY] = useState(window.scrollY);
  const [popupTop, setPopupTop] = useState(0);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target &&
        !(event.target as HTMLElement).closest(`.${cls.popupContent}`)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    // Calculate popup top position
    const windowHeight = window.innerHeight;
    const contentHeight =
      document.querySelector(`.${cls.popupContent}`)?.clientHeight || 0;
    const newPopupTop = Math.max(
      (windowHeight - contentHeight) / 2 + scrollY,
      0,
    );
    setPopupTop(newPopupTop);
  }, [isOpen, scrollY]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={cls.popupOverlay}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div className={cls.popupContent} style={{ top: `${popupTop}px` }}>
        <div className={`${cls.HeroInfoDiv} ${isHovered ? cls.hovered : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
