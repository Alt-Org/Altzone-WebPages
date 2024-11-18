import { classNames } from '@/shared/lib/classNames/classNames';
import { useFixed } from '../../model/FixedProvider';
import cls from './FixedButton.module.scss';

type Props = {
    className?: string;
};

export function FixedButton(props: Props) {
    const { className = '' } = props;

    const { isFixed, toggleFixed } = useFixed();

    return (
        <div className={classNames(cls.fixedButton, {}, [className])}>
            <button onClick={toggleFixed}>{isFixed ? '📍' : '📌'}</button>
        </div>
    );
}