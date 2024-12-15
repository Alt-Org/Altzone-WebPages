'use client';
import clsx from 'clsx';
import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import useScrollLock from '@/shared/lib/hooks/useScrollLock';
import cls from './Dialog.module.scss';

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            if (!dialog.open) dialog.showModal();
            dialog.focus();
        } else if (dialog.open) {
            setIsClosing(true);
            const timeoutId = setTimeout(() => {
                dialog.close();
                setIsClosing(false);
            }, 300);

            return () => clearTimeout(timeoutId);
        }
    }, [isOpen]);

    useScrollLock(isOpen || isClosing);

    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    };

    return (
        <dialog
            role="dialog"
            ref={dialogRef}
            className={clsx(cls.Dialog, {
                [cls.open]: isOpen && !isClosing,
                [cls.close]: isClosing,
            })}
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
