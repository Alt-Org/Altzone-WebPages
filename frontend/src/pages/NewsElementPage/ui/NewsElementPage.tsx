import {Navbar} from "@/widgets/Navbar";
import cls from './NewsElementPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {classNames} from "@/shared/lib/classNames/classNames";
import {useParams} from "react-router-dom";
import {NavGoBackButton} from "@/features/NavGoBack";
import {getPostDataById, Post} from "@/shared/ui/Post";
import {Container} from "@/shared/ui/Container";
import {newsDataLocally} from "@/entities/News";
import {useEffect} from "react";


const NewsElementPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const params = useParams();
    const pageID = params.id !== undefined ? params.id : "defaultValue";

    const postData = getPostDataById(pageID,newsDataLocally);

    return (
        <Container>
            <div className={classNames(cls.NewsElementPage)}>
                <FeedbackSideButton/>
                <Navbar className={cls.navbar}/>
                <NavGoBackButton/>
                {
                    postData ? <Post postData={postData}/>
                        : "Not found"
                }
            </div>
        </Container>
    );
};

export default NewsElementPage;

