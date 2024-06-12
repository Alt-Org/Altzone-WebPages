import React, { useEffect, useState } from 'react';
import cls from './popup.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  popupTop: number;
};

const Popup = ({ isOpen, onClose, children, className, popupTop }: Props) => {
  const [adjustedTop, setAdjustedTop] = useState(popupTop);

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
    if (isOpen) {
      const windowHeight = window.innerHeight;
      const contentHeight =
        document.querySelector(`.${cls.popupContent}`)?.clientHeight || 0;

      // Calculate adjusted top position
      let newTop = popupTop;
      if (newTop < 0) {
        newTop = 0;
      }
      setAdjustedTop(newTop);
    }
  }, [isOpen, popupTop]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cls.popupOverlay}>
      <div className={cls.popupContent} style={{ top: `${adjustedTop}px` }}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
