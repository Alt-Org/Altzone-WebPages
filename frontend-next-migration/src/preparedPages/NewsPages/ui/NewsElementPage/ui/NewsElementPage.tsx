'use client';
import { useParams } from 'next/navigation';
import { NavGoBackButton } from '@/features/NavGoBack';
import { formatNewsSingle } from '@/entities/News';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useScrollToTop } from '@/shared/lib/hooks';
import cls from './NewsElementPage.module.scss';
import Image from 'next/image';
import { useGetNewsByIdQuery } from '@/entities/NewsV2/Api/newsApi';
import { envHelper } from '@/shared/const/envHelper';

const NewsElementPage = () => {
    const { id } = useParams();

    useScrollToTop();

    const { data, isLoading } = useGetNewsByIdQuery(id as string);
    const params = useParams();
    const lng = params.lng as string;
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }
    const directusBaseUrl = envHelper.directusHost;
    const post = formatNewsSingle(data, lngCode || 'fi-FI');
    const picture = post.titlePicture?.id
        ? `${directusBaseUrl}/assets/${post.titlePicture.id}`
        : hannu.src;

    return (
        <Container>
            <NavGoBackButton />
            <div className={classNames(cls.NewsElementPage)}>
                <div className={cls.imageContainer}>
                    <Image
                        src={picture}
                        alt={''}
                        className={cls.imageBlur}
                        width={100}
                        height={600}
                    />
                    <Image
                        src={picture}
                        alt={''}
                        className={cls.image}
                        width={100}
                        height={600}
                    />
                </div>
                <h1 className={cls.title}>{post?.title}</h1>
                <h3 className={cls.subtitle}>{post?.previewText}</h3>
                <p className={cls.text}>{post?.bodyText}</p>
                <span className={cls.date}>{post?.date}</span>
            </div>
        </Container>
    );
};

export default NewsElementPage;
