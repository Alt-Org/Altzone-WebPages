import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ToggleCollapseButton.module.scss';
import Image from 'next/image';
import visible from '@/shared/assets/icons/visible.svg';
import invisible from '@/shared/assets/icons/hidden.svg';

type Props = {
    className?: string;
    disabled?: boolean;
    onClick: () => void;
    isCollapsed: boolean;
};

export function ToggleCollapseButton(props: Props) {
    const { className = '', disabled = false, onClick, isCollapsed } = props;

    return (
        <button
            role="collapseExpand"
            onClick={onClick}
            disabled={disabled}
            className={classNames(cls.ToggleCollapseButton, {}, [className])}
        >
            <Image
                loading="eager"
                alt={isCollapsed ? 'Show' : 'Hide'}
                src={isCollapsed ? invisible : visible}
                className={cls.buttonImage}
            />
        </button>
    );
}
