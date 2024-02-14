import {SectionHero} from "@/widgets/SectionHero";
import {DescriptionWithNav} from "@/widgets/DescriptionWithNav";
import {Navbar} from "@/widgets/Navbar";
import {Footer} from "@/widgets/Footer";
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {Container} from "@/shared/ui/Container";
import backgroundImage from '@/shared/assets/images/introBackground-transformed2.png';
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import cls from "./page.module.scss"
import {ScrollTop} from "@/features/ScrollTop";
import {useServerTranslation} from "@/shared/i18n";
import Link from "next/link";
import {classNames} from "@/shared/lib/classNames/classNames";
import Image from "next/image";


import bookImg from "@/shared/assets/images/mainpage/book.webp";
import SectionGetToKnow from "@/preparedPages/MainPage/ui/SectionGetToKnow/SectionGetToKnow";

type Props = {
    lng: string
}

const MainPage =  async ({ lng }: Props) => {

    const { t } = await useServerTranslation(lng, 'main');

    return (
        <>
            <div className={cls.Wrapper}>
                <FeedbackSideButton disableMobile={true}/>

                <Navbar marginTop={20}/>

                {/*<Container>*/}
                {/*    <DescriptionWithNav className={cls.description}/>*/}
                {/*</Container>*/}

                <SectionHero className={cls.heroSection}>
                    <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL}
                            className={cls.BtnGame}>
                        <Link target={"_blank"} href={AppExternalLinks.webgl}>
                            {t('PlayOnline')}
                        </Link>
                    </Button>
                </SectionHero>

          <SectionGetToKnow/>

                {/*<NewsPreviewSection  className={cls.NewsPreviewSection}/>*/}

                {/*<div style={{marginTop: "200px"}} ></div>*/}


                <Footer/>


                <ScrollTop/>
            </div>
        </>
    );
};


export default withBackgroundImage({
    alt: "Main-Page underground style background",
    imagePath: backgroundImage as unknown as string,
    // @ts-ignore
})(MainPage);

