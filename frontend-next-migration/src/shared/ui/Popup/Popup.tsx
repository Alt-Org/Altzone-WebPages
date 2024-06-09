import React from 'react';
import cls from './Popup.module.scss'; // Tarkista tämä polku

type Props = {
  isOpen: boolean; // Lisätty isOpen props
  onClose: () => void;
  children: React.ReactNode;
};

const Popup = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={cls.popupOverlay}>
      <div className={cls.popupContent}>
        <button className={cls.closeButton} onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
