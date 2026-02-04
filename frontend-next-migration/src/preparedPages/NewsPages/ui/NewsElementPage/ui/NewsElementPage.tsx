'use client';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useScrollToTop } from '@/shared/lib/hooks';
import cls from './NewsElementPage.module.scss';
import Image from 'next/image';
import {
    useGetNewsByIdQuery,
    useGetNewsQuery,
    formatNews,
    formatNewsSingle,
} from '@/entities/NewsV2';
import { envHelper } from '@/shared/const/envHelper';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import chevronleft from '@/shared/assets/icons/ChevronLeftBlack.svg';
import chevronright from '@/shared/assets/icons/ChevronRightBlack.svg';
import { useRouter, useParams } from 'next/navigation';
import { linkify } from '@/shared/ui/v2/Chatbot/utils/linkify';
import { useClientTranslation } from '@/shared/i18n';
import { NewsCard } from '@/widgets/NewsCard';
import { ShareButton } from '@/shared/ui/v2/ShareButton';

type HeroImageProps = {
    picture?: string;
};

const HeroImage = ({ picture }: HeroImageProps) => {
    if (!picture) return <div className={cls.noImageContainer} />;

    return (
        <div className={cls.imageContainer}>
            <Image
                src={picture}
                alt=""
                className={cls.imageBlur}
                width={100}
                height={600}
            />
            <Image
                src={picture}
                alt=""
                className={cls.image}
                width={100}
                height={600}
            />
        </div>
    );
};

const getBodyHtml = (newsBody: string | null | undefined, bodyText: string | undefined): string => {
    const hasWysiwygContent = newsBody && newsBody.trim() !== '';
    return hasWysiwygContent ? newsBody : linkify(bodyText ?? '');
};

const NewsElementPage = () => {
    useScrollToTop();
    const params = useParams();
    const id = params.id;
    const lng = params.lng as string;

    const { t } = useClientTranslation('news');
    const { data: moreNews } = useGetNewsQuery({ limit: 2 });
    const { data, isLoading } = useGetNewsByIdQuery(id as string);
    const directusBaseUrl = envHelper.directusHost;
    const router = useRouter();
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;

    const handleNextNews = (newsId: string) => {
        if (newsId) router.push(`/news/${newsId}`);
    };

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }

    const post = formatNewsSingle(data, lngCode || 'fi-FI');
    const groupedNews = formatNews(moreNews, lngCode || 'fi-FI');
    const picture = post.titlePicture?.id
        ? `${directusBaseUrl}/assets/${post.titlePicture.id}`
        : undefined;

    const bodyHtml = getBodyHtml(post.newsBody, post?.bodyText);

    return (
        <Container>
            <div className={cls.navButtons}>
                <Button
                    disabled={data.prevId === null}
                    onClick={() => handleNextNews(data.prevId)}
                    theme={ButtonTheme.PRIMARY}
                    size={ButtonSize.M}
                    className={classNames(cls.ButtonNewsNavigation)}
                >
                    {
                        <Image
                            loading="eager"
                            alt={'Pin'}
                            src={chevronleft}
                            className={cls.buttonImage}
                        />
                    }
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
                    {
                        <Image
                            loading="eager"
                            alt={'Pin'}
                            src={chevronright}
                            className={cls.buttonImage}
                        />
                    }
                </Button>
            </div>
            <div className={classNames(cls.NewsElementPage)}>
                <HeroImage picture={picture} />

                <h1 className={cls.title}>{post?.title}</h1>

                <h3 className={cls.subtitle}>{post?.previewText}</h3>

                <div className={cls.metaContainer}>
                    <span className={cls.author}>{post.author}</span>
                    <span className={cls.date}>{post?.date || 'Date/Time'}</span>
                </div>

                <div
                    className={cls.text}
                    dangerouslySetInnerHTML={{ __html: bodyHtml }}
                />

                <div className={cls.shareButton}>
                    <ShareButton>
                        <span className={cls.shareLabel}>{t('share-button')}</span>
                    </ShareButton>
                </div>
            </div>
            <div className={cls.readmoreText}>
                <h1 className={cls.titleReadmore}>{t('read-more')}</h1>
            </div>
            <div className={cls.newsGrid}>
                {groupedNews.map((news) => {
                    const imageSrc = news.titlePicture?.id
                        ? `${directusBaseUrl}/assets/${news.titlePicture.id}`
                        : undefined;
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
};

export default NewsElementPage;
