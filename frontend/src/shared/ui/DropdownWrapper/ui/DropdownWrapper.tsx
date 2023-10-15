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
        closeOnMouseLeave= false,
        className='',
        childrenWrapperClassName = '',
        contentClassName='',
        contentItemClassName='',
        elements,
        children,
        onOpen,
        onClose
    }) => {

    const mods: Record<string, boolean> = {
        [cls.contentAbsolute]: contentAbsolute,
    } as Record<string, boolean>;


    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handleMouseLeave = () => {

        if(!closeOnMouseLeave) return;

        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };


    /**
     * Toggles the dropdown open or close   d.
     *
     * @returns {void}
     */
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





    return (
        // <div className={cls.DropdownWrapper}>
        <div className={classNames(cls.DropdownWrapper,mods,[className])} onMouseLeave={handleMouseLeave}>
            <div onClick={toggleDropdown} role="button" tabIndex={0} className={classNames(cls.childrenWrapper,{},[childrenWrapperClassName])}>
                {children}
                <span>⇩</span>
            </div>

            {isOpen && (
                // <div className={cls.dropdownContent}>
                <div className={classNames(cls.dropdownContent,{},[contentClassName])}>
                    {elements.map((element,index) => (
                        <div onClick={() => handleElementClick(element.onClickCallback)} key={index}>
                            {
                                element.link ?
                                    <AppLink to={element.link.path} isExternal={element.link.isExternal} className={contentItemClassName} >
                                        <span >{element.elementText}</span>
                                    </AppLink>
                                    :
                                    <div className={contentItemClassName}>{
                                        element.elementText
                                    }</div>


                            }
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

