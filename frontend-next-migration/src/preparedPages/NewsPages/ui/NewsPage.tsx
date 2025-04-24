'use client';
import { Container } from '@/shared/ui/Container';
import { NewsCard } from '@/widgets/NewsCard';
import cls from './NewsPage.module.scss';
import { useGetNewsQuery } from '@/entities/NewsV2';
import { useParams } from 'next/navigation';
import { formatNews } from '@/entities/News';

const NewsPage = () => {
    // later use this to fetch data from the backend
    // const handleSearchChange = () => {
    //     // setSearchValue(e.target.value);
    // };

    const { data } = useGetNewsQuery();
    const params = useParams();
    const lng = params.lng as string;
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;

    const groupedNews = formatNews(data, lngCode || 'fi-FI');

    return (
        <main className={cls.NewsPage}>
            <Container>
                <div className={cls.newsGrid}>
                    {groupedNews.map((news) => (
                        <NewsCard
                            key={news.id}
                            {...news}
                        />
                    ))}
                </div>
            </Container>
        </main>
    );
};

export default NewsPage;
