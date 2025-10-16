'use client';
import { faCaretDown, faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, KeyboardEvent } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { DropdownWrapperProps } from '../types';
import cls from './DropdownWrapper.module.scss';

/**
 * Dropdown wrapper component used in NavbarDesktopV2 and NavbarMobileV2
 * Renders a dropdown menu with customizable content and behavior
 *
 * @param {DropdownWrapperProps} props - Component props
 * @param {boolean} props.contentAbsolute - Whether dropdown content should be absolutely positioned
 * @param {string} props.className - Additional class name for wrapper
 * @param {string} props.childrenWrapperClassName - Class name for children wrapper
 * @param {string} props.contentClassName - Class name for dropdown content
 * @param {string} props.contentItemClassName - Class name for dropdown items
 * @param {Array} props.elements - Array of dropdown menu items
 * @param {boolean} props.isDisabled - Whether dropdown is disabled
 * @param {ReactNode} props.children - Trigger element content
 * @param {function} props.onOpen - Callback when dropdown opens
 * @param {function} props.onClose - Callback when dropdown closes
 * @param {boolean} props.disableClickToggle - Disable click toggling
 * @param {boolean} props.isOpen - Control open state
 */
export const DropdownWrapper = (props: DropdownWrapperProps) => {
    const {
        contentAbsolute = false,
        className = '',
        childrenWrapperClassName = '',
        contentClassName = '',
        contentItemClassName = '',
        elements,
        isDisabled,
        children,
        onOpen,
        onClose,
        disableClickToggle = false,
        isOpen,
    } = props;

    const [shouldRender, setShouldRender] = useState<boolean>(false);
    const [animationState, setAnimationState] = useState<'opening' | 'closing' | ''>('');

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setAnimationState('opening');
            if (onOpen) onOpen();
        } else if (shouldRender) {
            setAnimationState('closing');
            if (onClose) onClose();
        }
    }, [isOpen]);

    const handleAnimationEnd = () => {
        if (animationState === 'closing') {
            setShouldRender(false);
        }
        setAnimationState('');
    };

    const toggleDropdown = (): void => {
        if (disableClickToggle) return;
        if (onOpen && !isOpen) {
            onOpen();
        } else if (onClose && isOpen) {
            onClose();
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter' && !isDisabled?.status) {
            if (onOpen && !isOpen) {
                onOpen();
            }
        } else if (event.key === 'Escape' && isOpen) {
            if (onClose) onClose();
        }
    };

    const mods: Record<string, boolean> = {
        [cls.contentAbsolute]: contentAbsolute,
    };

    const modsContent: Record<string, boolean> = {
        [cls.open]: isOpen,
        [cls.closed]: !isOpen && animationState === 'closing',
        [cls.opening]: animationState === 'opening',
        [cls.closing]: animationState === 'closing',
    };

    const mainElementClass = isDisabled?.status ? cls.disabled : '';

    return (
        <div
            className={classNames(cls.DropdownWrapper, mods, [className])}
            role="button"
            aria-haspopup="true"
            onKeyDown={handleKeyDown}
            tabIndex={0}
        >
            <div
                onClick={!isDisabled?.status ? toggleDropdown : undefined}
                role="button"
                title={isDisabled?.status ? isDisabled?.reason : ''}
                className={classNames(cls.childrenWrapper, {}, [childrenWrapperClassName])}
            >
                {children}
            </div>

            {shouldRender && (
                <div
                    className={classNames(cls.dropdownContent, modsContent, [contentClassName])}
                    onAnimationEnd={handleAnimationEnd}
                    role="menu"
                >
                    {elements.map((element, index) => {
                        if (element && typeof element === 'object' && 'elementText' in element) {
                            return (
                                <div
                                    key={index}
                                    role="menuitem"
                                    className={
                                        element.isDisabled && element.isDisabled.status
                                            ? cls.disabled
                                            : ''
                                    }
                                    title={
                                        element.isDisabled?.status ? element.isDisabled.reason : ''
                                    }
                                >
                                    {element.link ? (
                                        <AppLink
                                            to={element.link.path}
                                            isExternal={element.link.isExternal}
                                            className={classNames(contentItemClassName, {
                                                [cls.active]: element.active,
                                            })}
                                            onClick={() => {
                                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                                onClose && onClose();
                                                try {
                                                    document.dispatchEvent(
                                                        new CustomEvent('az:dropdown-select'),
                                                    );
                                                } catch {}
                                            }}
                                        >
                                            {element.elementText}
                                            {element.link.isExternal && (
                                                <FontAwesomeIcon
                                                    className={cls.externalLinkIcon}
                                                    size={'2xs'}
                                                    icon={faExternalLink}
                                                    style={{
                                                        display: 'inline',
                                                        verticalAlign: 'middle',
                                                        marginLeft: '5px',
                                                        color: 'var(--content-primary)',
                                                    }}
                                                />
                                            )}
                                        </AppLink>
                                    ) : (
                                        <span
                                            className={''}
                                            style={{
                                                cursor: 'pointer',
                                                color: element.active
                                                    ? 'var(--secondary-color)'
                                                    : 'white',
                                            }}
                                            onClick={() => {
                                                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                                onClose && onClose();
                                                try {
                                                    document.dispatchEvent(
                                                        new CustomEvent('az:dropdown-select'),
                                                    );
                                                } catch {}
                                                element.onClickCallback?.();
                                            }}
                                        >
                                            {element.elementText}
                                        </span>
                                    )}
                                </div>
                            );
                        } else {
                            return <div key={index}>{element}</div>;
                        }
                    })}
                </div>
            )}
        </div>
    );
};
