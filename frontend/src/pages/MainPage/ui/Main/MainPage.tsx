import {HeroSection} from "@/widgets/HeroSection";
import {DescriptionWithNav} from "@/widgets/DescriptionWithNav";
import {NewsPreviewSection} from "@/widgets/NewsPreviewSection";
import {Navbar} from "@/widgets/Navbar";
import {Footer} from "@/widgets/Footer";
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {Container} from "@/shared/ui/Container";
import backgroundImage from '@/shared/assets/images/introBackground.png';


import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import cls from "./MainPage.module.scss"



const MainPage = () => {
    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.webgl);
    }

    return (
        <div className={cls.Wrapper}>
                <FeedbackSideButton />
                <Navbar overlayed marginTop={20} />

                <HeroSection className={cls.heroSection}>
                    <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL} className={cls.BtnGame} onClick={handleClick}>Pelaa netissä!</Button>
                </HeroSection>

                <Container>
                    <DescriptionWithNav className={cls.description} />
                </Container>
                <NewsPreviewSection />
                <Footer />
        </div>
    );
};


export default withBackgroundImage(MainPage, backgroundImage);


