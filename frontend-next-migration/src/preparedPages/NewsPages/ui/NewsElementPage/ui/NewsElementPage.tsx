'use client';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import chevronleft from '@/shared/assets/icons/ChevronLeftBlack.svg';
import chevronright from '@/shared/assets/icons/ChevronRightBlack.svg';
import { Container } from '@/shared/ui/Container';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { NewsCard } from '@/widgets/NewsCard';
import { ShareButton } from '@/shared/ui/v2/ShareButton';
import { useScrollToTop } from '@/shared/lib/hooks';
import { classNames } from '@/shared/lib/classNames/classNames';
import { formatDate } from '@/shared/lib/formatters/formatDate';
import { envHelper } from '@/shared/const/envHelper';
import {
    useGetNewsByIdQuery,
    useGetNewsQuery,
    formatNews,
    formatNewsSingle,
} from '@/entities/NewsV2';
import { useClientTranslation } from '@/shared/i18n';
import cls from './NewsElementPage.module.scss';

function NewsElementPage() {
    useScrollToTop();

    // Get route parameters: news id and language code
    const params = useParams();
    const id = params.id;
    const lng = params.lng as string;
    const router = useRouter();
    const { t } = useClientTranslation('news');

    // Fetch more news for "read more" section and current news by id
    const { data: moreNews } = useGetNewsQuery(2);
    const { data, isLoading } = useGetNewsByIdQuery(id as string);

    // Base URL for images from Directus CMS
    const directusBaseUrl = envHelper.directusHost;

    // Normalize language code for formatting
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;

    // Show loading state if data not ready
    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    // Format news data for display
    const post = formatNewsSingle(data, lngCode || 'fi-FI');
    const groupedNews = formatNews(moreNews, lngCode || 'fi-FI');

    // Determine image URL or fallback
    const picture = post.titlePicture?.id
        ? `${directusBaseUrl}/assets/${post.titlePicture.id}`
        : hannu.src;

    // Format date and author strings
    const formattedDate = formatDate(post.date);
    const formattedAuthor = post.formattedAuthor;

    // Handler for navigation to previous/next news article
    const handleNextNews = (newsId: string | null) => {
        if (newsId) {
            router.push(`/${lng}/news/${newsId}`);
        }
    };

    return (
        <Container>
            {/* Navigation buttons for previous and next news */}
            <div className={cls.navButtons}>
                <Button
                    disabled={data.prevId === null}
                    onClick={() => handleNextNews(data.prevId)}
                    theme={ButtonTheme.PRIMARY}
                    size={ButtonSize.M}
                    className={classNames(cls.ButtonNewsNavigation)}
                >
                    <Image
                        loading="eager"
                        alt="Previous"
                        src={chevronleft}
                        className={cls.buttonImage}
                    />
                    {t('previous-button')}
                </Button>

                <Button
                    disabled={data.nextId === null}
                    onClick={() => handleNextNews(data.nextId)}
                    theme={ButtonTheme.PRIMARY}
                    size={ButtonSize.M}
                    className={classNames(cls.ButtonNewsNavigation)}
                >
                    {t('next-button')}
                    <Image
                        loading="eager"
                        alt="Next"
                        src={chevronright}
                        className={cls.buttonImage}
                    />
                </Button>
            </div>

            {/* Main news content */}
            <div className={classNames(cls.NewsElementPage)}>
                {/* Image with blur effect */}
                <div className={cls.imageContainer}>
                    <Image
                        src={picture}
                        alt={post.title || ''}
                        className={cls.imageBlur}
                        width={100}
                        height={600}
                    />
                    <Image
                        src={picture}
                        alt={post.title || ''}
                        className={cls.image}
                        width={100}
                        height={600}
                    />
                </div>

                {/* Title and subtitle */}
                <h1 className={cls.title}>{post.title}</h1>
                <h3 className={cls.subtitle}>{post.subtitle || post.previewText}</h3>

                {/* Main body text */}
                <p className={cls.text}>{post.bodyText}</p>

                {/* Author and date metadata */}
                <p className={cls['news-meta']}>
                    {formattedAuthor ? `${formattedAuthor} / ${formattedDate}` : formattedDate}
                </p>

                {/* Share button component */}
                <div className={cls.shareButton}>
                    <ShareButton>
                        <span className={cls.shareLabel}>{t('share')}</span>
                    </ShareButton>
                </div>
            </div>

            {/* Read more section header */}
            <div className={cls.readmoreText}>
                <h1 className={cls.titleReadmore}>{t('read-more')}</h1>
            </div>

            {/* Grid of related news cards */}
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
    );
}

export default NewsElementPage;
