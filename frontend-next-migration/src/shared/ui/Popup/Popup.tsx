import React from 'react';
import cls from './Popup.module.scss'; // Tarkista tämä polku

type Props = {
  onClose: () => void;
  children: React.ReactNode;
};

const Popup = ({ onClose, children }: Props) => {
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
