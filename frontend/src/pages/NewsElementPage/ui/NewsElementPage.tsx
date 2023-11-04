import {Navbar} from "@/widgets/Navbar";
import cls from './NewsElementPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {classNames} from "@/shared/lib/classNames/classNames";
import {useParams} from "react-router-dom";
import {NavGoBackButton} from "@/features/NavGoBack";
import {getPostDataById, Post} from "@/shared/ui/Post";
import {Container} from "@/shared/ui/Container";
import {newsDataLocally} from "@/entities/News";
import {useScrollToTop} from "@/shared/lib/hooks/useScrollToTop";
import {Helmet} from "react-helmet-async";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";


const NewsElementPage = () => {

    useScrollToTop();

    const params = useParams();
    const pageID = params.id !== undefined ? params.id : "defaultValue";

    const postData = getPostDataById(pageID,newsDataLocally);


    return (
        <Container>

            <Helmet>
                <title>{postData ? postData.title : 'Uutinen'}</title>
                {/*// @ts-ignore*/}
                <meta name="description" content={postData ? postData?.bodyPreview : 'Lue uusimmat uutiset Altzonesta täällä.'} />
                <meta name="keywords" content="altzone, uutiset, peliyhteisö, sarjakuvat, pelit" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.NEWS}/${pageID}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={postData ? postData.title : 'Uutinen - Altzone'} />
                {/*// @ts-ignore*/}
                <meta property="og:description" content={postData ? postData?.bodyPreview : 'Lue uusimmat uutiset Altzonesta täällä.'} />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.NEWS}/${pageID}`} />
            </Helmet>

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

