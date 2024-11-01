import { useState } from 'react';
import cls from './Button.module.scss';
import visible from '@/shared/assets/images/visible.png';
import unvisible from '@/shared/assets/images/unvisible.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import Image from 'next/image';

type CollapsedProps = {
    className?: string;
    toggleCollapsed: () => void;
    isCollapsed: boolean;
};

type FixedProps = {
    className?: string;
    toggleFixed: () => void;
    isFixed: boolean;
};

/**
 * A button component for the collapse/expand functionality.
 *
 * @export
 * @param {Props} props - CSS classes applied based on the usage scenario.
 * @returns
 */
export function CollapsedButton(props: CollapsedProps) {
    const [enabled, setEnabled] = useState(true);
    const { className = '', isCollapsed, toggleCollapsed } = props;

    const onClick = () => {
        // changing the state too quickly breaks the animation states in Navbar
        if (enabled) {
            toggleCollapsed();
            setEnabled(false);
            setTimeout(() => {
                setEnabled(true);
            }, 1001);
        }
    };
    return (
        <div className={classNames(cls.collapsedButton, {}, [className])}>
            <button onClick={onClick}>
                <Image
                    loading={'eager'}
                    alt="visibility"
                    src={isCollapsed ? unvisible : visible}
                    width={42}
                    className={cls.buttonImage}
                />
            </button>
        </div>
    );
}

export function FixedButton(props: FixedProps) {
    const { className = '', isFixed, toggleFixed } = props;

    return (
        <div className={classNames(cls.fixedButton, {}, [className])}>
            <button onClick={toggleFixed}>{isFixed ? '📍' : '📌'}</button>
        </div>
    );
}
