'use client';
import { useState } from 'react';
import { Container } from '@/shared/ui/Container';
import { NewsCard } from '@/widgets/NewsCard';
import cls from './NewsPage.module.scss';
import { SearchInput } from '@/features/Search';

const NewsPage = () => {
    const [searchValue, setSearchValue] = useState('');
    // later use this to fetch data from the backend
    const handleSearchChange = () => {
        // setSearchValue(e.target.value);
    };
    const newsPageMock = [
        {
            id: 1,
            title: 'Hannu Hodari News',
            content: 'Check out the latest news about Hannu Hodari and his amazing adventures!',
            date: '2024-03-01',
        },
        {
            id: 2,
            title: 'Latest News Title 2',
            content:
                'Another interesting news article with important information about recent developments.',
            date: '2024-02-28',
        },

        {
            id: 3,
            title: 'Latest News Title 3',
            content:
                'Another interesting news article with important information about recent developments.',
            date: '2024-02-28',
        },
        {
            id: 4,
            title: 'Latest News Title 4',
            content:
                'Another interesting news article with important information about recent developments.',
            date: '2024-02-28',
        },
    ];
    return (
        <main className={cls.NewsPage}>
            <Container>
                <div className={cls.header}>
                    <h2 className={cls.title}>News</h2>
                    <div>
                        <SearchInput
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <div className={cls.newsGrid}>
                    {newsPageMock.map((news) => (
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
