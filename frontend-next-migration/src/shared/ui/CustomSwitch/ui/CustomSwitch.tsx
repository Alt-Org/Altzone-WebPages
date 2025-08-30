import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import cls from './CustomSwitch.module.scss';
import { CustomSwitchItems } from '@/shared/ui/CustomSwitch';
import type { ToggleItem, ToggleLink, ProgressIndicator } from '../model/types';

export interface CustomSwitchProps {
    elements: ToggleItem[] | ToggleLink[] | ProgressIndicator[];
    className?: string;
}

/**
 * CustomSwitch component is reusable customizable switch. Toggleable items can be links or with function.
 * @param {CustomSwitchProps} props - props for the component
 * @example
 * // Example of the elements when using the non link version:
 * import { CustomSwitch, CustomSwitchItems, ToggleItem } from '@/shared/ui/CustomSwitch';
 * const [customSwitchOption, setCustomSwitchOption] = useState(0);
 *    const CustomSwitchElements: ToggleItem[] = [
 *       {
 *           children: <p>Globaali</p>,
 *       },
 *       {
 *           children: <p>Klaani</p>,
 *       },
 *       {
 *           children: <p>Kaverit</p>,
 *       },
 *   ].map((elem, index) => {
 *       return {
 *           type: CustomSwitchItems.ToggleItem as CustomSwitchItems.ToggleItem,
 *           isOpen: customSwitchOption === index,
 *           onOpen: () => {
 *               if (customSwitchOption !== index) {
 *                   setCustomSwitchOption(index);
 *               }
 *           },
 *           ...elem,
 *       };
 *   });
 * return <CustomSwitch elements={CustomSwitchElements} />;
 * @example
 * // Example of the elements when using the link version (not tested yet)
 */
const CustomSwitch = ({ elements, className }: CustomSwitchProps) => {
    const customSwitchClassName = classNames(
        cls.CustomSwitch,
        {},
        [className].filter((i) => i !== undefined),
    );

    const openIndex = elements.findIndex((elem) => elem.isOpen);

    return (
        <div className={customSwitchClassName}>
            {elements.map((element, index) => (
                <React.Fragment key={index}>
                    {element.type === CustomSwitchItems.ToggleLink && (
                        <AppLink
                            className={classNames(cls.ToggleItem, {
                                [cls.OpenToggleItem]: element.isOpen,
                            })}
                            to={element.path}
                        >
                            {element.children}
                        </AppLink>
                    )}
                    {element.type === CustomSwitchItems.ToggleItem && (
                        <div
                            className={classNames(cls.ToggleItem, {
                                [cls.OpenToggleItem]: element.isOpen,
                            })}
                            onClick={element.onOpen}
                        >
                            {element.children}
                        </div>
                    )}
                    {element.type === CustomSwitchItems.ProgressIndicator && (
                        <div
                            className={classNames(cls.ProgressItem, {
                                [cls.OpenToggleItem]: element.isOpen,
                                [cls.BeforeOpen]: openIndex !== -1 && index < openIndex,
                            })}
                        >
                            {element.children}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default CustomSwitch;
