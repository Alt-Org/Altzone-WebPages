import {FC, useEffect, useRef, useState} from 'react';
import cls from './DropdownWrapper.module.scss';
import {classNames} from "@/shared/lib/classNames/classNames";
import {DropdownWrapperProps} from "../types";
import {AppLink} from "@/shared/ui/AppLink/AppLink";

/**
 * A wrapper component that provides dropdown functionality.
 * @component
 *
 *
 * @example
 * const dropdownElements = [
 {
            id: '1',
            elementText: 'Option 1',
            onClickCallback: () => {
                console.log('Option 1 clicked!');
            },
        },
 ];
 * <DropdownWrapper elements={dropdownElements} > <button>press me<button/> <DropdownWrapper/>
 * @param {DropdownWrapperProps} props - The props for the DropdownWrapper component.
 * @returns {JSX.Element} The rendered DropdownWrapper component.
 */
export const DropdownWrapper: FC<DropdownWrapperProps> = (
    {
        contentAbsolute= false,
        mouseOverLeaveMode= false,
        className='',
        childrenWrapperClassName = '',
        contentClassName='',
        contentItemClassName='',
        elements,
        children,
        onOpen,
        onClose
    }) => {



    const [isOpen, setIsOpen] = useState<boolean>(false);



    const handleMouseOver = () => {
        if(!mouseOverLeaveMode) return;
        setIsOpen(true);
        if (onOpen) {
            onOpen();
        }
    };

    const handleMouseLeave = () => {
        if(!mouseOverLeaveMode) return;
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };


    const toggleDropdown = (): void => {
        setIsOpen(!isOpen);
        if(isOpen && onOpen){
            onOpen();
        }
        if(!isOpen && onClose){
            onClose();
        }
    };



    /**
     * Handles the click event for a dropdown element.
     *
     * @param {Function} onClick - The onClick callback function for the element.
     * @returns {void}
     */
    const handleElementClick = (onClick?: () => void): void => {
        onClick && onClick();
    };


    const mods: Record<string, boolean> = {
        [cls.contentAbsolute]: contentAbsolute,
    } as Record<string, boolean>;

    const dropdownContentMods: Record<string, boolean> = {
        [cls.closed]: !isOpen,
    } as Record<string, boolean>;


    return (
        <div className={
            classNames(cls.DropdownWrapper,mods,[className])}
             onMouseLeave={handleMouseLeave}
        >
            <div onClick={toggleDropdown}
                 onMouseOver={handleMouseOver}
                 role="button"
                 tabIndex={0}
                 className={classNames(cls.childrenWrapper, {},[childrenWrapperClassName])}
            >
                {children}
                <span>⇩</span>
            </div>

                <div className={classNames(cls.dropdownContent,dropdownContentMods,[contentClassName])}>
                    {elements.map((element,index) => (
                        <div
                            onClick={element.isDisabled && element.isDisabled.status ? undefined : () => handleElementClick(element.onClickCallback)}
                            key={index}
                            className={element.isDisabled && element.isDisabled.status ? cls.disabled : ''}
                            title={element.isDisabled?.status === true ? element?.isDisabled?.reason : ''}
                        >
                            {
                                element.link ?
                                    <AppLink to={element.link.path} isExternal={element.link.isExternal} className={contentItemClassName} >
                                        {element.elementText}
                                    </AppLink>
                                    :
                                    <span className={contentItemClassName}>{
                                        element.elementText
                                    }</span>


                            }
                        </div>
                    ))}
                </div>
        </div>
    );
};

