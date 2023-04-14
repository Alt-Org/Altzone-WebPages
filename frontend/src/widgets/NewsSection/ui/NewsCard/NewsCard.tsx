import cls from "./NewsCard.module.scss";
import {classNames} from "@/shared/lib/classNames/classNames";
import {memo, useMemo} from "react";
import {Card} from "@/shared/ui/Card/Card";
import {INewsElement} from "../../model/types/types";
import {truncateText} from "@/shared/lib/truncateText/truncateText";


interface NewsCardProps extends INewsElement{
    className?: string;
    bodyLength: number;
}

export const NewsCard = memo((props: NewsCardProps) => {
    const {
        title,
        body,
        bodyLength,
        date,
        readMoreLink,
        className='',
    }= props;

    const truncatedBody = useMemo(() => {
        const truncate = truncateText(bodyLength);
        return truncate(body);
    }, [body, bodyLength]);

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

            <Card.ReadMoreLink path={readMoreLink.path} className={cls.readMoreLink}  withScalableLink>
                {readMoreLink.name}
            </Card.ReadMoreLink>

        </Card>
    )
})
