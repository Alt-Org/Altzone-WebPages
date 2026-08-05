import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NewsCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
    className?: string;
    title: string;
    previewText?: string;
    description?: string;
    date: string;
    publisher?: string;
    id: number;
    titlePicture?: string;
}

const NewsCard = (props: NewsCardProps) => {
    const {
        className = '',
        title,
        date,
        id,
        previewText,
        description,
        publisher = 'ALT Zone tiimi',
        titlePicture,
    } = props;
    const picture = titlePicture;
    const text = description ?? previewText ?? '';

    return (
        <Link
            rel="id"
            href={`/news/${id}`}
            className={classNames(cls.NewsCardLink)}
        >
            <article className={classNames(cls.NewsCard, { [cls.noImage]: !picture }, [className])}>
                {picture && (
                    <div className={cls.imageContainer}>
                        <Image
                            src={picture}
                            alt={title}
                            className={cls.image}
                            width={342}
                            height={255}
                        />
                    </div>
                )}
                <div className={cls.content}>
                    <h2 className={cls.title}>{title}</h2>
                    {text && <p className={cls.text}>{text}</p>}
                    <div className={cls.meta}>
                        <span className={cls.date}>{date}</span>
                        {publisher && <span className={cls.publisher}>{publisher}</span>}
                    </div>
                </div>
            </article>
        </Link>
    );
};

NewsCard.displayName = 'NewsCard';

export default memo(NewsCard);
