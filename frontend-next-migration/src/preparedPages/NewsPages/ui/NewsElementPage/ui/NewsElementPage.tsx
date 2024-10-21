'use client';
import { useParams } from 'next/navigation';
import { Navbar } from '@/widgets/Navbar';
import { NavGoBackButton } from '@/features/NavGoBack';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { newsDataLocally } from '@/entities/News';
import { getPostDataById, Post } from '@/shared/ui/Post';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useScrollToTop } from '@/shared/lib/hooks/useScrollToTop';
import cls from './NewsElementPage.module.scss';

const NewsElementPage = () => {
    const { id } = useParams();

    useScrollToTop();
    const postData = getPostDataById(id as string, newsDataLocally);

    return (
        <Container>
            <div className={classNames(cls.NewsElementPage)}>
                <FeedbackSideButton />
                <Navbar className={cls.navbar} />
                <NavGoBackButton />
                {postData ? <Post postData={postData} /> : 'Not found'}
            </div>
        </Container>
    );
};

export default NewsElementPage;
