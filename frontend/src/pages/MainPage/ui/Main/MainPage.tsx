import {HeroSection} from "@/widgets/HeroSection";
import cls from "./MainPage.module.scss";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {Container} from "@/shared/ui/Container";
import {DescriptionWithNav} from "@/widgets/DescriptionWithNav";
import {NewsPreviewSection} from "@/widgets/NewsPreviewSection";
import {Navbar} from "@/widgets/Navbar";
import {FeedbackSideButton} from "@/features/FeedbackByExternalSource";
import {openLinkInNewTab} from "@/shared/lib/openLinkInNewTab/openLinkInNewTab";
import {Footer} from "@/widgets/Footer";


const MainPage = () => {

    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.webgl);
    }

    return (
        <>
            <FeedbackSideButton/>
            <Navbar overlayed marginTop={20} />
            <HeroSection className={cls.heroSection} >
                <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL} className={cls.BtnGame} onClick={handleClick} > Pelaa netissa !</Button>
            </HeroSection>

            <Container>
                <DescriptionWithNav/>
            </Container>
            <NewsPreviewSection/>
            <Footer />
        </>
    );
};

export default MainPage;



