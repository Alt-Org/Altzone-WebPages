import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Title.module.scss';
import emoji from '@/shared/assets/icons/Feedback/JoyChatEmoticon.png';
import Image from 'next/image';

interface Props {
    className?: string;
    title: string;
}

export const Title = memo((props: Props) => {
    const { title, className = '' } = props;

    return (
        <div className={cls.TitleContainer}>
            <p className={classNames(cls.Title, {}, [className])}>{title}</p>
            <Image
                src={emoji.src}
                alt={'joyemoji'}
                width={45}
                height={45}
            />
        </div>
    );
});

Title.displayName = 'Footer-title';
