'use client'
import {useParams} from 'next/navigation';
import { getPostDataById, Post } from '@/shared/ui/Post';
import { newsDataLocally } from '@/entities/News';
import { Container } from '@/shared/ui/Container';
import Head from 'next/head';
import { Navbar } from '@/widgets/Navbar';
import { NavGoBackButton } from '@/features/NavGoBack';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import cls from './NewsElementPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { envHelper } from '@/shared/const/env/envHelper';
import { RoutePaths } from '@/shared/appLinks/RoutePaths';
import {useScrollToTop} from "@/shared/lib/hooks/useScrollToTop";

const NewsElementPage = () => {
    // @ts-ignore
    const { id } = useParams()

    useScrollToTop();
    const postData = getPostDataById(id as string, newsDataLocally);

    return (
        <Container>
            <Head>
                <title>{postData ? postData.title : 'Uutinen'}</title>
                {/*// @ts-ignore*/}
                <meta name="description" content={postData ? postData.bodyPreview : 'Lue uusimmat uutiset Altzonesta täällä.'} />
                <meta name="keywords" content="altzone, uutiset, peliyhteisö, sarjakuvat, pelit" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.NEWS}/${id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={postData ? postData.title : 'Uutinen - Altzone'} />
                {/*// @ts-ignore*/}
                <meta property="og:description" content={postData ? postData?.bodyPreview : 'Lue uusimmat uutiset Altzonesta täällä.'} />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.NEWS}/${id}`} />

            </Head>

            <div className={classNames(cls.NewsElementPage)}>
                <FeedbackSideButton />
                <Navbar className={cls.navbar} />
                <NavGoBackButton />
                {
                    postData ? <Post postData={postData} />
                        : "Not found"
                }
            </div>
        </Container>
    );
};

export default NewsElementPage;

