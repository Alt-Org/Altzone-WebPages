import {Navbar} from "@/widgets/Navbar";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./AboutPage.module.scss";
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {DropDownElement, DropdownWrapper} from "@/shared/ui/DropdownWrapper";
import {Helmet} from "react-helmet-async";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";


const AboutPage = () => {

    const dropdownElements: DropDownElement[] = [
        {
            id: '1',
            elementText: 'Option 1',
            onClickCallback: () => {
                console.log('Option 1 clicked!');
            },
            link:  {
                isExternal: true,
                path: "google.com"
            }
        },
        {
            id: '2',
            elementText: 'Option 2',
            onClickCallback: () => {
                console.log('Option 2 clicked!');
            },
            link:  {
                isExternal: true,
                path: "google.com"
            }
        },
    ];

    return (
        <div className={classNames(cls.AboutPage)}>
            <Helmet>
                <title>Tietoja sivustosta</title>
                <meta name="description" content="Saa lisätietoja meistä ja palvelustamme täältä." />
                <meta name="keywords" content= "altzone, peli, peliyhteisö, tietoja, about, meistä, yhteisö, pelialusta" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.ABOUT}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Tietoja sivustosta" />
                <meta property="og:description" content="Saa lisätietoja meistä ja palvelustamme täältä." />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.ABOUT}`} />
            </Helmet>
            <FeedbackSideButton/>
            <Navbar className={cls.navbar}/>
            <h1>About page</h1>

            <DropdownWrapper elements={dropdownElements}>
                <div>press me</div>
            </DropdownWrapper>


        </div>
    );
};

export default AboutPage;
