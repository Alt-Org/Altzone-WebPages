import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Title.module.scss';

interface Props {
    className?: string;
    title: string;
}

export const Title = memo((props: Props) => {
    const { title, className = '' } = props;

    return <p className={classNames(cls.Title, {}, [className])}>{title}</p>;
});

Title.displayName = 'Footer-title';
