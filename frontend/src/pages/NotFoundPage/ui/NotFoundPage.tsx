import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./NotFoundPage.module.scss";
import {Navbar} from "@/widgets/Navbar";
import {Helmet} from "react-helmet-async";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className= '' }: NotFoundPageProps) => {
    return (
        <div className={classNames(cls.NotFoundPage, {}, [className])}>


            <Helmet>
                <title>Sivua ei löydy</title>
                <meta name="description" content='Valitettavasti pyytämääsi sivua ei löytynyt.' />
                <meta name="keywords" content="altzone, sivua ei löydy, 404" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.NOT_FOUND}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content='Sivua ei löydy - Altzone' />
                <meta property="og:description" content='Valitettavasti pyytämääsi sivua ei löytynyt.' />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.NOT_FOUND}`} />
            </Helmet>

            <Navbar className={cls.navbar} overlayed/>
            <span>Sivua ei löydy</span>
        </div>
    );
};
