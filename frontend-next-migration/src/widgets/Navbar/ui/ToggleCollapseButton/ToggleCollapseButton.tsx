import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ToggleCollapseButton.module.scss';
import Image from 'next/image';
import visible from '@/shared/assets/images/visible.png';
import invisible from '@/shared/assets/images/unvisible.png';

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
            role="menuitem"
            data-testid="collapseExpand"
            onClick={onClick}
            disabled={disabled}
            className={classNames(cls.ToggleCollapseButton, {}, [className])}
        >
            <Image
                loading="eager"
                alt="visibility"
                src={isCollapsed ? invisible : visible}
                width={42}
                className={cls.buttonImage}
            />
        </button>
    );
}
