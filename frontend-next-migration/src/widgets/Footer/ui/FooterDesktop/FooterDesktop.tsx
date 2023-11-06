import {memo} from "react";
import {Container} from "@/shared/ui/Container";
import cls from "./FooterDesktop.module.scss";
import {SocialSection} from "../SocialSection/SocialSection";
import {socialLinks} from "../../model/data/socialSectionMenu";
import {Rights} from "../Rights/Rights";
import {Title} from "../Title/Title";

const FooterDesktopComponent = memo(() => {
    return (
        <footer className={cls.Footer}>
            <Container>
                <Title className={cls.title}/>
                <SocialSection className={cls.socialSection} socialLinks={socialLinks} />
                <Rights className={cls.rights}/>
            </Container>
        </footer>
    );
});

FooterDesktopComponent.displayName = 'FooterDesktopComponent';

export default FooterDesktopComponent;


