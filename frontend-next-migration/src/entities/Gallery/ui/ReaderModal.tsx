'use client';
import { useEffect, useRef } from 'react';

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

        if (open && !dialog.open) {
            dialog.showModal();
        }

        if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            style={{
                width: '90vw',
                height: '90vh',
                padding: 0,
                border: 'none',
                background: 'transparent',
            }}
        >
            {children}
        </dialog>
    );
}
