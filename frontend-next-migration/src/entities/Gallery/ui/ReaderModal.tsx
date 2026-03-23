'use client';
import { useEffect, useRef } from 'react';
import cls from './ReaderModal.module.scss';

type ReaderModalProps = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export function ReaderModal({ open, onClose, children }: ReaderModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open) {
            if (!dialog.open) {
                dialog.showModal();
            }
        } else {
            if (dialog.open) {
                dialog.close();
            }
        }
    }, [open]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [open]);

    const handleClose = () => {
        onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            className={cls.dialog}
            onClose={handleClose}
        >
            <div
                className={cls.backdrop}
                onClick={handleClose}
            />

            <div className={cls.content}>{children}</div>
        </dialog>
    );
}
