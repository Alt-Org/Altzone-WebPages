import { faCaretDown, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { DropdownWrapperProps } from "../types";
import cls from "./DropdownWrapper.module.scss";

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
export const DropdownWrapper: FC<DropdownWrapperProps> = ({
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
}: DropdownWrapperProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleMouseOver = () => {
    if (!mouseOverLeaveMode) return;
    setIsOpen(true);
    if (onOpen) {
      onOpen();
    }
  };

  const handleMouseLeave = () => {
    if (!mouseOverLeaveMode) return;
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
    if (isOpen && onOpen) {
      onOpen();
    }
    if (!isOpen && onClose) {
      onClose();
    }
  };

  /**
   * Handles the click event for a dropdown element.
   *
   * @param {Function} onClick - The onClick callback function for the element.
   * @returns {void}
   */
  // const handleElementClick = (onClick?: () => void): void => {
  //   onClick && onClick();
  // };

  const mods: Record<string, boolean> = {
    [cls.contentAbsolute]: contentAbsolute,
  } as Record<string, boolean>;

  const dropdownContentMods: Record<string, boolean> = {
    [cls.closed]: !isOpen,
  } as Record<string, boolean>;

  const mainElementClass = isDisabled?.status ? cls.disabled : '';

  return (
    <div
      className={classNames(cls.DropdownWrapper, mods, [className])}
      onMouseLeave={handleMouseLeave}>
      <div
        onClick={!isDisabled?.status ? toggleDropdown : undefined}
        onMouseOver={!isDisabled?.status ? handleMouseOver : undefined}
        role='button'
        title={isDisabled?.status ? isDisabled?.reason : ''}
        tabIndex={0}
        className={classNames(cls.childrenWrapper, {}, [
          childrenWrapperClassName,
          mainElementClass,
        ])}>
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

      <div
        className={classNames(cls.dropdownContent, dropdownContentMods, [
          contentClassName,
        ])}>
        {elements.map((element, index) => (
          <div
            key={index}
            className={
              element.isDisabled && element.isDisabled.status
                ? cls.disabled
                : ''
            }
            title={
              element.isDisabled?.status === true
                ? element?.isDisabled?.reason
                : ''
            }>
            {element.link ? (
              <AppLink
                to={element.link.path}
                isExternal={element.link.isExternal}
                className={contentItemClassName}>
                {element.elementText}
                {/* Show external link icon only if the link is external */}
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
        ))}
      </div>
    </div>
  );
};
