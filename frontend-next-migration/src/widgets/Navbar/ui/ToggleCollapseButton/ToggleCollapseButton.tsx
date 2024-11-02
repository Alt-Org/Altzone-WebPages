import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ToggleCollapseButton.module.scss';
import Image from 'next/image';
import visible from '@/shared/assets/images/visible.png';
import invisible from '@/shared/assets/images/unvisible.png';
import { useCollapsed } from '../../model/CollapsedProvider';

type Props = {
    className?: string;
};

export function ToggleCollapseButton(props: Props) {
    const { className = '' } = props;

    const { isCollapsed, toggleCollapsed } = useCollapsed();

    return (
        <button
            onClick={toggleCollapsed}
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
