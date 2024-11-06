import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ToggleFixButton.module.scss';
import pinned from '@/shared/assets/icons/pinned.svg';
import unpin from '@/shared/assets/icons/unpin.svg';
import Image from 'next/image';

type Props = {
    className?: string;
    onClick: () => void;
    isFixed: boolean;
};

export function ToggleFixButton(props: Props) {
    const { className = '', onClick, isFixed } = props;
    return (
        <button
            onClick={onClick}
            className={classNames(cls.ToggleFixButton, {}, [className])}
        >
            {
                <Image
                    loading="eager"
                    alt={isFixed ? 'Unpin' : 'Pin'}
                    src={isFixed ? pinned : unpin}
                    className={cls.buttonImage}
                />
            }
        </button>
    );
}
