import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NewsCard.module.scss';
import Image from 'next/image';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import Link from 'next/link';

interface NewsCardProps {
    className?: string;
    title: string;
    previewText: string;
    date: string;
    id: number;
    titlePicture?: string;
}

const NewsCard = (props: NewsCardProps) => {
    const { title, date, id, previewText, titlePicture } = props;
    const picture = titlePicture || hannu.src;
    return (
        <Link
            rel="id"
            href={`/news/${id}`}
        >
            <div className={classNames(cls.NewsCard, {})}>
                <div className={cls.content}>
                    <h2 className={cls.title}>{title}</h2>
                    <p className={cls.text}>{previewText}</p>
                    <span className={cls.date}>{date}</span>
                    <div className={cls.imageContainer}>
                        <div className={cls.imageWrapper}>
                            <Image
                                src={picture}
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
        </Link>
    );
};

NewsCard.displayName = 'NewsCard';

export default memo(NewsCard);
