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
import backgroundImage from '@/shared/assets/images/introBackground.avif';



const MainPage = () => {

    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.webgl);
    }



    const dynamicStyles = `
        .${cls.Wrapper}::before {
            background-image: url(${backgroundImage});
        }
    `;


    return (
        <>
        <style>{dynamicStyles}</style>
        <div className={cls.Wrapper} data-bg-image={backgroundImage}>

            <FeedbackSideButton/>
            <Navbar overlayed marginTop={20} />
            <HeroSection className={cls.heroSection}>
                <Button withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL} className={cls.BtnGame} onClick={handleClick}>Pelaa netissa!</Button>
            </HeroSection>

            <Container>
                <DescriptionWithNav className={cls.description}/>
            </Container>
            <NewsPreviewSection/>
            <Footer />
        </div>
        </>
    );

};


export default MainPage;



