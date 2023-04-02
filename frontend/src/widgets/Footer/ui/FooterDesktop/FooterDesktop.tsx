import {memo} from "react";
import {Container} from "@/shared/ui/Container";
import cls from "./FooterDesktop.module.scss";
import {SocialSection} from "../SocialSection/SocialSection";
import {Title} from "../Title/Title";
import {socialLinks} from "../../model/data/socialSectionMenu";
import {Rights} from "../Rights/Rights";


export default memo(( ) => {

    return (
        <footer className={cls.Footer}>
            <Container>
                <Title className={cls.title}>
                    Be part of our Community
                </Title>
            <SocialSection className={cls.socialSection} socialLinks={socialLinks} />
                <Rights className={cls.rights}/>
            </Container>
        </footer>
    )
});