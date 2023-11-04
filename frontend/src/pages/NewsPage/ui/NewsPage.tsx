import {Navbar} from "@/widgets/Navbar";
import cls from './NewsPage.module.scss'
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {classNames} from "@/shared/lib/classNames/classNames";
import {Helmet} from "react-helmet-async";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

const NewsPage = () => {
    return (
        <div className={classNames(cls.NewsPage)}>

            <Helmet>
                <title>Uutiset</title>
                <meta name="description" content='Lue uusimmat uutiset Altzonesta täällä.' />
                <meta name="keywords" content="altzone, uutiset, peliyhteisö, sarjakuvat, pelit" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.NEWS}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content='Uutiset - Altzone' />
                <meta property="og:description" content='Lue uusimmat uutiset Altzonesta täällä.' />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.NEWS}`} />
            </Helmet>

            <FeedbackSideButton/>
            <Navbar className={cls.navbar}/>
            <h1>Uutiset</h1>
        </div>
    );
};

export default NewsPage;

