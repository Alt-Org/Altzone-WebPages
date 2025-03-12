import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NewsCard.module.scss';
import Image from 'next/image';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';

interface NewsCardProps {
    className?: string;
    title: string;
    content: string;
    date: string;
    id: number;
}

const NewsCard = (props: NewsCardProps) => {
    const { title, content, date } = props;

    return (
        <div className={classNames(cls.NewsCard, {})}>
            <div className={cls.content}>
                <h3 className={cls.title}>{title}</h3>
                <p className={cls.text}>{content}</p>
                <span className={cls.date}>{date}</span>
            </div>

            <div className={cls.imageContainer}>
                <Image
                    src={hannu.src}
                    alt={title}
                    className={cls.image}
                    width={600}
                    height={300}
                />
            </div>
        </div>
    );
};

export default memo(NewsCard);
