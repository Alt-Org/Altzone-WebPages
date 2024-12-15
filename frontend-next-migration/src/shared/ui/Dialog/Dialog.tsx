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
    titleId?: string;
    descriptionId?: string;
};

const Dialog = ({ isOpen, onClose, children, titleId, descriptionId }: DialogProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const firstFocusableRef = useRef<HTMLButtonElement>(null);
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

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            event.stopPropagation();
            onClose();
        }
    };

    const trapFocus = (event: KeyboardEvent) => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const focusableElements = dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
        }
    };

    const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
        if (event.target === dialogRef.current) {
            onClose();
        }
    };

    useEffect(() => {
        if (!isOpen) return;

        const controller = new AbortController();
        const { signal } = controller;

        const wrappedHandleKeyDown = (e: KeyboardEvent) => handleKeyDown(e);
        const wrappedTrapFocus = (e: KeyboardEvent) => trapFocus(e);

        document.addEventListener('keydown', wrappedHandleKeyDown, { signal });
        document.addEventListener('keydown', wrappedTrapFocus, { signal });

        return () => controller.abort();
    }, [isOpen, handleKeyDown, trapFocus]);

    return (
        <dialog
            role="dialog"
            ref={dialogRef}
            className={clsx(cls.Dialog, {
                [cls.open]: isOpen && !isClosing,
                [cls.close]: isClosing,
            })}
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            onClick={handleBackdropClick}
        >
            <Button
                ref={firstFocusableRef}
                onClick={onClose}
                className={cls.Close}
                theme={ButtonTheme.Graffiti}
                aria-label="Close dialog"
            >
                X
            </Button>
            {children}
        </dialog>
    );
};

export default Dialog;
