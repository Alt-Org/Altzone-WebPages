'use client';
import { Container } from '@/shared/ui/Container';
import { NewsCard } from '@/widgets/NewsCard';
import cls from './NewsPage.module.scss';
import { useGetNewsQuery, formatNews } from '@/entities/NewsV2';
import { useParams } from 'next/navigation';
import { envHelper } from '@/shared/const/envHelper';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import { useGetTotalNewsCountQuery } from '@/entities/NewsV2/Api/newsApi';
import { useCallback, useEffect, useRef, useState } from 'react';
import { News } from '@/entities/NewsV2/model/types/types';
import { useClientTranslation } from '@/shared/i18n';

const NewsPage = () => {
    // later use this to fetch data from the backend
    // const handleSearchChange = () => {
    //     // setSearchValue(e.target.value);
    // };

    const params = useParams();
    const lng = params.lng as string;
    const currentSlug = typeof params.slug === 'string' ? params.slug : undefined;
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;
    const directusBaseUrl = envHelper.directusHost;

    const limit = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [allNews, setAllNews] = useState<News[]>([]);
    const [hasMoreNewsState, setHasMoreNewsState] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { t } = useClientTranslation('news');
    const { data: news } = useGetNewsQuery({ limit, page: currentPage, categorySlug: currentSlug });
    const { data: totalNewsCount } = useGetTotalNewsCountQuery(currentSlug ?? '');

    useEffect(() => {
        if (typeof totalNewsCount === 'number') {
            setHasMoreNewsState(limit * currentPage < totalNewsCount);
        }
    }, [currentPage, totalNewsCount]);

    useEffect(() => {
        if (news) {
            if (news.length === 0) {
                setHasMoreNewsState(false);
            }
            setAllNews((prevNews) => {
                return currentPage === 1 ? news : [...prevNews, ...news];
            });
            setIsLoading(false);
        }
    }, [news]);

    const loadMoreNews = () => {
        if (hasMoreNewsState) {
            setIsLoading(true);
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Intersection Observer to load more news when the observeElementRef is in view
    const observer = useRef<IntersectionObserver | null>(null);
    const observeElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading) return;
            if (observer.current) {
                observer.current.disconnect();
            }
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMoreNewsState) {
                    loadMoreNews();
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [hasMoreNewsState, isLoading],
    );

    const renderNoMoreNews = () => {
        if (typeof totalNewsCount === 'number' && !hasMoreNewsState && allNews.length >= 5) {
            return <div className={cls.noMoreNews}>{t('no-more-news')}</div>;
        }
        return null;
    };

    const groupedNews = formatNews(allNews, lngCode || 'fi-FI');

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
                    {hasMoreNewsState && <div ref={observeElementRef} />}
                </div>
                <div>{isLoading && 'Loading...'}</div>
                {renderNoMoreNews()}
            </Container>
        </main>
    );
};

export default NewsPage;
