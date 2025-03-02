'use client';
import { Container } from '@/shared/ui/Container';
import { CustomForm } from '@/shared/ui/CustomForm';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import NewsCard from './NewsCard/NewsCard';
import cls from './NewsPage.module.scss';

const newsPageMock = [
    {
        id: 1,
        title: 'Hannu Hodari News',
        content: 'Check out the latest news about Hannu Hodari and his amazing adventures!',
        date: '2024-03-01',
        imageUrl: hannu.src,
    },
    {
        id: 2,
        title: 'Latest News Title 2',
        content:
            'Another interesting news article with important information about recent developments.',
        date: '2024-02-28',
        imageUrl: hannu.src,
    },

    {
        id: 3,
        title: 'Latest News Title 3',
        content:
            'Another interesting news article with important information about recent developments.',
        date: '2024-02-28',
        imageUrl: hannu.src,
    },
    {
        id: 4,
        title: 'Latest News Title 4',
        content:
            'Another interesting news article with important information about recent developments.',
        date: '2024-02-28',
        imageUrl: hannu.src,
    },
];

const NewsPage = () => {
    return (
        <div className={cls.News}>
            <Container>
                <div className={cls.header}>
                    <h1>News</h1>
                    <div className={cls.searchContainer}>
                        <CustomForm.InputField
                            label=""
                            inputProps={{
                                placeholder: 'Search news...',
                            }}
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
        </div>
    );
};

export default NewsPage;
