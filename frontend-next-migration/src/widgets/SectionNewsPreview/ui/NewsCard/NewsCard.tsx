import { memo, useMemo } from 'react';
import { INewsElement } from '@/entities/News';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card/Card';
import { truncateText } from '@/shared/lib/truncateText/truncateText';
import { getOneNewsPageRoute } from '@/shared/appLinks/RoutePaths';
import cls from './NewsCard.module.scss';

interface NewsCardProps extends INewsElement {
    className?: string;
    bodyLength: number;
}

const NewsCard = (props: NewsCardProps) => {
    const { title, bodyPreview, bodyLength, date, id, className = '' } = props;

    const truncatedBody = useMemo(() => {
        const truncate = truncateText(bodyLength);
        if (bodyPreview) {
            return truncate(bodyPreview);
        }
    }, [bodyPreview, bodyLength]);

    return (
        <Card className={classNames(cls.Card, {}, [className])}>
            <div className={cls.content}>
                <Card.Title className={cls.title}>{title}</Card.Title>

                <Card.Date className={cls.date}>{date.toLocaleDateString('fi-FI')}</Card.Date>

                <Card.Body className={cls.body}>{truncatedBody}</Card.Body>
            </div>

            <Card.ReadMoreLink
                path={getOneNewsPageRoute(id)}
                className={cls.readMoreLink}
                withScalableLink
            >
                Lue lisää
            </Card.ReadMoreLink>
        </Card>
    );
};

NewsCard.displayName = 'NewsCard';

export default memo(NewsCard);
