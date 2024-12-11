'use client';
import { useState, useEffect, MouseEvent } from 'react';
import cls from './DropdownWrapper.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownWrapperProps } from '../types';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faExternalLink } from '@fortawesome/free-solid-svg-icons';

export const DropdownWrapper = (props: DropdownWrapperProps) => {
    const {
        contentAbsolute = false,
        mouseOverLeaveMode = false,
        className = '',
        childrenWrapperClassName = '',
        contentClassName = '',
        contentItemClassName = '',
        elements,
        isDisabled,
        children,
        onOpen,
        onClose,
        openByDefault = false,
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(openByDefault);
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

    const [closeTimer, setCloseTimer] = useState<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (!mouseOverLeaveMode) return;

        if (closeTimer) {
            clearTimeout(closeTimer);
            setCloseTimer(null);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        if (!mouseOverLeaveMode) return;

        const timer = setTimeout(() => {
            setIsOpen(false);
            setCloseTimer(null);
        }, 200);
        setCloseTimer(timer);
    };

    const toggleDropdown = (): void => {
        setIsOpen(!isOpen);
    };

    const mods: Record<string, boolean> = {
        [cls.contentAbsolute]: contentAbsolute,
    };

    const modsContent: Record<string, boolean> = {
        [cls.open]: isOpen && animationState !== 'closing',
        [cls.closed]: !isOpen && animationState === 'closing',
        [cls.opening]: animationState === 'opening',
        [cls.closing]: animationState === 'closing',
    };

    const mainElementClass = isDisabled?.status ? cls.disabled : '';

    return (
        <div
            className={classNames(cls.DropdownWrapper, mods, [className])}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                onClick={!isDisabled?.status ? toggleDropdown : undefined}
                role="button"
                title={isDisabled?.status ? isDisabled?.reason : ''}
                tabIndex={0}
                className={classNames(cls.childrenWrapper, {}, [
                    childrenWrapperClassName,
                    mainElementClass,
                ])}
            >
                {children}
                <FontAwesomeIcon
                    size={'2xs'}
                    icon={faCaretDown}
                    style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease-in-out',
                    }}
                />
            </div>

            {shouldRender && (
                <div
                    className={classNames(cls.dropdownContent, modsContent, [contentClassName])}
                    onAnimationEnd={handleAnimationEnd}
                >
                    {elements.map((element, index) => {
                        if (element && typeof element === 'object' && 'elementText' in element) {
                            return (
                                <div
                                    key={index}
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
                                            className={contentItemClassName}
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
                                                        color: 'var(--inverted-primary-color)',
                                                    }}
                                                />
                                            )}
                                        </AppLink>
                                    ) : (
                                        <span className={contentItemClassName}>
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
