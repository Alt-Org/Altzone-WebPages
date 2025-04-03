import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './CustomSwitch.module.scss';

interface ToggleItem {
    isOpen: boolean;
    onOpen?: () => void;
    path?: string;
    className?: string;
    children: ReactNode;
}

interface CustomSwitchProps {
    elements: ToggleItem[];
    className?: string;
}

const CustomSwitch = ({ elements, className }: CustomSwitchProps) => {
    const customSwitchClassName = classNames(
        cls.CustomSwitch,
        {},
        [className].filter((i) => i !== undefined),
    );
    return (
        <div className={customSwitchClassName}>
            {elements.map((element, index) => (
                <div
                    key={index}
                    className={classNames('', { [cls.OpenToggleItem]: element.isOpen })}
                    onClick={element.onOpen}
                >
                    <p>hello</p>
                </div>
            ))}
        </div>
    );
};

export default CustomSwitch;
