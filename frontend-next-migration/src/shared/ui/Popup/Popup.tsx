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
      <div className={cls.popupContent}>
        <div className={`${cls.HeroInfoDiv} ${isHovered ? cls.hovered : ''}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Popup;
