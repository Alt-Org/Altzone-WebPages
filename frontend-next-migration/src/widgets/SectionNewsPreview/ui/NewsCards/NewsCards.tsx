import { memo } from 'react';
import { INewsElement } from '@/entities/News';
import { CustomSlider } from '@/shared/ui/CustomSlider/CustomSlider';
import NewsCard from '../NewsCard/NewsCard';

interface NewsCardProps {
    className?: string;
    news: INewsElement[];
}

export const NewsCards = memo(({ className = '', news }: NewsCardProps) => {
    return (
        <CustomSlider className={className}>
            {news.map((item) => (
                <NewsCard
                    bodyLength={200}
                    key={item.id}
                    title={item.title}
                    bodyPreview={item.bodyPreview}
                    date={item.date}
                    id={item.id}
                />
            ))}
        </CustomSlider>
    );
});

NewsCards.displayName = 'NewsCards';
