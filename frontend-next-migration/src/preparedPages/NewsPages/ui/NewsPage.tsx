'use client';
import { Container } from '@/shared/ui/Container';
import { NewsCard } from '@/widgets/NewsCard';
import cls from './NewsPage.module.scss';
import { useGetNewsQuery, formatNews } from '@/entities/NewsV2';
import { useParams } from 'next/navigation';
import { envHelper } from '@/shared/const/envHelper';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import { useGetTotalNewsCountQuery } from '@/entities/NewsV2/Api/newsApi';

const NewsPage = () => {
    // later use this to fetch data from the backend
    // const handleSearchChange = () => {
    //     // setSearchValue(e.target.value);
    // };

    const params = useParams();
    const lng = params.lng as string;
    const categorySlug = typeof params.slug === 'string' ? params.slug : undefined;
    const page = 3;
    const limit = 6;

    const { data: news } = useGetNewsQuery({ limit, page, categorySlug });
    const { data: totalNewsCount } = useGetTotalNewsCountQuery();
    // console.log(totalNewsCount);

    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;
    const directusBaseUrl = envHelper.directusHost;

    const hasMoreNews = () => {
        const recievedCount = limit * page;
        return recievedCount < (totalNewsCount ?? 0);
    };
    // console.log('has more news?,', hasMoreNews());

    const groupedNews = formatNews(news, lngCode || 'fi-FI');
    // console.log(groupedNews);

    return (
        <main className={cls.NewsPage}>
            <Container>
                <div className={cls.newsGrid}>
                    {groupedNews.map((news) => {
                        const imageSrc = news.titlePicture?.id
                            ? `${directusBaseUrl}/assets/${news.titlePicture.id}`
                            : hannu.src;
                        return (
                            <NewsCard
                                key={news.id}
                                titlePicture={imageSrc}
                                title={news.title}
                                previewText={news.previewText}
                                date={news.date}
                                id={news.id}
                            />
                        );
                    })}
                </div>
            </Container>
        </main>
    );
};

export default NewsPage;
