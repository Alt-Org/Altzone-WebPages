import {memo} from "react";
import {Container} from "@/shared/ui/Container";
import cls from "./FooterDesktop.module.scss";
import {SocialSection} from "../SocialSection/SocialSection";
import {Rights} from "../Rights/Rights";
import {Title} from "../Title/Title";
import {SocialIconLink, Texts} from "../../model/types/types";

interface Props {
    title: string,
    socialIconLinks: SocialIconLink[],
    texts: Texts;
}

const FooterDesktopComponent = memo((props: Props) => {

    const {
        title,
        socialIconLinks,
        texts
    } = props;

    return (
        <footer className={cls.Footer}>
            <Container>
                <Title
                    className={cls.title}
                    title={title}
                />
                <SocialSection
                    className={cls.socialSection}
                    socialIconLinks={socialIconLinks}
                />
                <Rights
                    className={cls.rights}
                    texts={texts}
                />
            </Container>
        </footer>
    );
});

FooterDesktopComponent.displayName = 'FooterDesktopComponent';

export default FooterDesktopComponent;


