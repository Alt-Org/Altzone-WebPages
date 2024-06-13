'use client'
import {useParams} from 'next/navigation';
import { getPostDataById, Post } from '@/shared/ui/Post';
import { newsDataLocally } from '@/entities/News';
import { Container } from '@/shared/ui/Container';
import { Navbar } from '@/widgets/Navbar';
import { NavGoBackButton } from '@/features/NavGoBack';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import cls from './NewsElementPage.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import {useScrollToTop} from "@/shared/lib/hooks/useScrollToTop";

const NewsElementPage = () => {
    // @ts-ignore
    const { id } = useParams()

    useScrollToTop();
    const postData = getPostDataById(id as string, newsDataLocally);

    return (
        <Container>
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

