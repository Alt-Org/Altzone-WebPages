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
import { current } from '@reduxjs/toolkit';

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

    const { data: news } = useGetNewsQuery({ limit, page: currentPage, categorySlug });
    const { data: totalNewsCount } = useGetTotalNewsCountQuery();

    const hasMoreNews = () => {
        const receivedCount = limit * currentPage;
        if (typeof totalNewsCount !== 'number') return false;
        return receivedCount < totalNewsCount;
    };
    const [hasMoreNewsState, setHasMoreNewsState] = useState(hasMoreNews());
    // console.log(
    //     'has more news',
    //     hasMoreNews(),
    //     'hasmorenews state',
    //     hasMoreNewsState,
    //     'totalnews count',
    //     totalNewsCount,
    //     'current page',
    //     currentPage,
    // );
    useEffect(() => {
        setHasMoreNewsState(hasMoreNews());
    }, [currentPage, totalNewsCount]);

    useEffect(() => {
        if (news) {
            setAllNews((prevNews) => {
                return currentPage === 1 ? news : [...prevNews, ...news];
            });
        }
    }, [news]);

    const loadMoreNews = () => {
        if (hasMoreNewsState) {
            // console.log(allNews);
            setCurrentPage((prev) => prev + 1);
        }
    };

    useEffect(() => {
        // console.log('page', currentPage);
    }, [currentPage]);

    const observeElem = useRef<HTMLSpanElement | null>(null);
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
        // console.log(entries[0]);
        if (entries[0].isIntersecting) {
            // your logic here
            loadMoreNews();
        }
    };
    const observerOptions = {
        threshold: 1,
    };

    useEffect(() => {
        if (typeof window === 'undefined' || !window.IntersectionObserver) return;
        if (!observeElem.current) {
            return;
        }
        const observer = new IntersectionObserver(handleObserver, observerOptions);
        if (observeElem.current) {
            observer.observe(observeElem.current);
        }

        // clean up
        return () => {
            if (observeElem.current) {
                observer.unobserve(observeElem.current);
            }
        };
    }, [hasMoreNewsState]);

    const groupedNews = formatNews(allNews, lngCode || 'fi-FI');
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
                    {hasMoreNewsState ? (
                        <span ref={observeElem} />
                    ) : (
                        <div>There is no news left</div>
                    )}
                </div>
            </Container>
        </main>
    );
};

export default NewsPage;
