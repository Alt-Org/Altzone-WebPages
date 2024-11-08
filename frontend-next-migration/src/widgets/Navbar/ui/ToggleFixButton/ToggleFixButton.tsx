import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ToggleFixButton.module.scss';

type Props = {
    className?: string;
    onClick: () => void;
    isFixed: boolean;
};

export function ToggleFixButton(props: Props) {
    const { className = '', onClick, isFixed } = props;
    return (
        <button
            role="menuitem"
            data-testid="toggleFixButton"
            onClick={onClick}
            className={classNames(cls.ToggleFixButton, {}, [className])}
        >
            {isFixed ? '📍' : '📌'}
        </button>
    );
}
