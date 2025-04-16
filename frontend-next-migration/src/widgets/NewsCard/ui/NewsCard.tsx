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
    imageSrc?: string;
}

const NewsCard = (props: NewsCardProps) => {
    const { title, date, id, content, imageSrc = hannu.src } = props;
    return (
        <div className={classNames(cls.NewsCard, {})}>
            <div className={cls.content}>
                <h2 className={cls.title}>{title}</h2>
                <p className={cls.text}>{content}</p>
                <span className={cls.date}>Date:{date}</span>
                <div className={cls.imageContainer}>
                    <div className={cls.imageWrapper}>
                        <Image
                            src={imageSrc}
                            alt={title}
                            className={cls.image}
                            layout="responsive"
                            width={100}
                            height={600}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

NewsCard.displayName = 'NewsCard';

export default memo(NewsCard);
