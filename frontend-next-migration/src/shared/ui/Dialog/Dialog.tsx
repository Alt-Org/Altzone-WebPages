'use client';
import { MouseEvent, ReactNode, useEffect, useRef } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import cls from './Dialog.module.scss';

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) {
                dialog.showModal();
            }
            setTimeout(() => {
                dialog.focus();
            }, 0);
        } else if (dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            ref={dialogRef}
            className={cls.Dialog}
            onClick={handleBackdropClick}
        >
            <Button
                onClick={onClose}
                className={cls.Close}
                theme={ButtonTheme.Graffiti}
            >
                X
            </Button>
            {children}
        </dialog>
    );
};

export default Dialog;
