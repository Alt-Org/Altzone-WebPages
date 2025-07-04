'use client';
import { Container } from '@/shared/ui/Container';
import { NewsCard } from '@/widgets/NewsCard';
import cls from './NewsPage.module.scss';
import { useGetNewsQuery, formatNews } from '@/entities/NewsV2';
import { useParams } from 'next/navigation';
import { envHelper } from '@/shared/const/envHelper';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import { useGetTotalNewsCountQuery } from '@/entities/NewsV2/Api/newsApi';
import { useEffect, useRef, useState } from 'react';
import { News } from '@/entities/NewsV2/model/types/types';

const NewsPage = () => {
    // later use this to fetch data from the backend
    // const handleSearchChange = () => {
    //     // setSearchValue(e.target.value);
    // };

    const params = useParams();
    const lng = params.lng as string;
    const categorySlug = typeof params.slug === 'string' ? params.slug : undefined;
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;
    const directusBaseUrl = envHelper.directusHost;

    const limit = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const [allNews, setAllNews] = useState<News[]>([]);
    const [hasMoreNewsState, setHasMoreNewsState] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { data: news } = useGetNewsQuery({ limit, page: currentPage, categorySlug });
    const { data: totalNewsCount } = useGetTotalNewsCountQuery(categorySlug ?? '');
    // console.log('🔄 NewsPage render', { currentPage, allNews, hasMoreNewsState, isLoading });

    const isLoadingRef = useRef(isLoading);
    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    useEffect(() => {
        if (typeof totalNewsCount === 'number') {
            setHasMoreNewsState(limit * currentPage < totalNewsCount);
        }
    }, [currentPage, totalNewsCount]);

    useEffect(() => {
        if (news) {
            // console.log('data arrived', news);
            if (news.length === 0) {
                setHasMoreNewsState(false);
            }
            setAllNews((prevNews) => {
                return currentPage === 1 ? news : [...prevNews, ...news];
            });
            setIsLoading(false);
            // console.log('isLoading', isLoading);
        }
    }, [news]);
    useEffect(() => {
        // console.log('isLoading changed:', isLoading);
    }, [isLoading]);

    const loadMoreNews = () => {
        if (hasMoreNewsState) {
            // console.log('loadMoreNews called...');
            setIsLoading(true);
            setCurrentPage((prev) => prev + 1);
        }
    };

    const observerRef = useRef<HTMLSpanElement | null>(null);
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        // console.log('🔍 Observer fired', entries[0]);
        // console.log(
        //     'is intersecting',
        //     entries[0].isIntersecting,
        //     'isLoading',
        //     !isLoading,
        //     'isLoadingRef',
        //     !isLoadingRef.current,
        //     'hasMoreNewsState',
        //     hasMoreNewsState,
        //     'allNews.length',
        //     allNews.length > 0,
        // );
        // console.log(entries[0].isIntersecting && !isLoadingRef.current && hasMoreNewsState);
        if (entries[0].isIntersecting && !isLoadingRef.current && hasMoreNewsState) {
            loadMoreNews();
        }
    };

    useEffect(() => {
        // console.log('🔄 useEffect for IntersectionObserver');
        if (typeof window === 'undefined' || !window.IntersectionObserver) return;
        const observerElem = observerRef.current;
        if (!observerElem || !hasMoreNewsState) {
            return;
        }
        const observer = new IntersectionObserver(handleObserver, {
            threshold: 1,
        });
        observer.observe(observerElem);

        return () => {
            if (observerElem) {
                observer.unobserve(observerElem);
            }
        };
    }, [hasMoreNewsState]);

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
                    {hasMoreNewsState && <span ref={observerRef} />}
                </div>
                {typeof totalNewsCount === 'number' && !hasMoreNewsState && (
                    <div className={cls.noMoreNews}>No more news available</div>
                )}
            </Container>
        </main>
    );
};

export default NewsPage;
