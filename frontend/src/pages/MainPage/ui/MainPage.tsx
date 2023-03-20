import {HeroSection} from "@/widgets/HeroSection";
import {Navbar} from "@/widgets/Navbar";
import cls from "./MainPage.module.scss";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {AppExternalLinks} from "@/shared/assets/appExternalLinks/appExternalLinks";

const MainPage = () => {
    return (
        <>
            <Navbar overlayed marginTop={20} />
            {/*<NavbarTouch overlayed marginTop={20} />*/}
            {/*<Navbar overlayed marginTop={20} />*/}
            <HeroSection className={cls.heroSection} >
                <Button theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL} > <a href={AppExternalLinks.webgl} target="_blank">Pelaa netissa !</a></Button>
            </HeroSection>

            <br/>
            <br/>

            <HeroSection className={cls.heroSection}>
            </HeroSection>
        </>
    );
};

export default MainPage;
