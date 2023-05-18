import cls from "./NewsCard.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useMemo} from "react";
import {Card} from "@/shared/ui/Card/Card";
import {truncateText} from "@/shared/lib/truncateText/truncateText";
import {INewsElement} from "@/entities/News";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";


interface NewsCardProps extends INewsElement{
    className?: string;
    bodyLength: number;
}

export const NewsCard = memo((props: NewsCardProps) => {
    const {
        title,
        bodyPreview,
        bodyLength,
        date,
        id,
        className='',
    }= props;

    const truncatedBody = useMemo(() => {
        const truncate = truncateText(bodyLength);
        if(bodyPreview){
            return truncate(bodyPreview);
        }
    }, [bodyPreview, bodyLength]);

    return(
        <Card className={classNames(cls.Card, {}, [className])}>
            <div className={cls.content}>
                <Card.Title className={cls.title}>
                    {title}
                </Card.Title>

                <Card.Date className={cls.date}>
                    {date.toLocaleDateString('fi-FI')}
                </Card.Date>

                <Card.Body className={cls.body}>
                    {truncatedBody}
                </Card.Body>
            </div>

            <Card.ReadMoreLink
                path={`${RoutePaths.NEWS}/${id}`}
                className={cls.readMoreLink}  withScalableLink>
                Lue lisää
            </Card.ReadMoreLink>

        </Card>
    )
})
