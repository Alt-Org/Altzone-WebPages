import { classNames } from '@/shared/lib/classNames/classNames';
import { useFixed } from '../../model/FixedProvider';
import cls from './ToggleFixButton.module.scss';

type Props = {
    className?: string;
};

export function ToggleFixButton(props: Props) {
    const { className = '' } = props;

    const { isFixed, toggleFixed } = useFixed();

    return (
        <div className={classNames(cls.ToggleFixButton, {}, [className])}>
            <button onClick={toggleFixed}>{isFixed ? '📍' : '📌'}</button>
        </div>
    );
}
