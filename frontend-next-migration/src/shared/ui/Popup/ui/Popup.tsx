import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import cls from './popup.module.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    popupTop?: number;
};

/**
 * Popup component to display a modal-like overlay.
 *
 * @example
 * ```tsx
 * <Popup
 *     isOpen={true}
 *     onClose={() => console.log('Popup closed')}
 *     className="custom-popup-class"
 * >
 *     <p>Popup Content</p>
 * </Popup>
 * ```
 */
const Popup = ({ isOpen, onClose, children, className }: Props) => {
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

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className={cls.popupOverlay}>
            <div className={`${cls.popupContent} ${className}`}>{children}</div>
        </div>,
        document.body,
    );
};

export default Popup;
