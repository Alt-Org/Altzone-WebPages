import { memo } from 'react';
import { Card } from '@/shared/ui/Card/Card';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NewsCard.module.scss';

interface NewsCardProps {
    className?: string;
    title: string;
    content: string;
    date: string;
    imageUrl: string;
    id: number;
}

const NewsCard = (props: NewsCardProps) => {
    const { className, title, content, date, imageUrl, id } = props;

    return (
        <Card className={classNames(cls.NewsCard, {}, [className])}>
            <div className={cls.content}>
                <h3 className={cls.title}>{title}</h3>
                <p className={cls.text}>{content}</p>
                <span className={cls.date}>{date}</span>
            </div>
            <div className={cls.imageContainer}>
                <img src={imageUrl} alt={title} className={cls.image} />
            </div>
        </Card>
    );
};

export default memo(NewsCard); 