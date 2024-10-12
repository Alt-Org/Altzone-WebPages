"use client"
import { Navbar } from "@/widgets/Navbar";
import { Container } from "@/shared/ui/Container";
import cls from "./ClanMainPage.module.scss";
import backgroundImage from "@/shared/assets/images/backgrounds/background.webp"
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";

const ClanMainPage = ({ children }: any) => {

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <div className={cls.ClansViewMain}>
                    {children}
                </div>
            </Container>

        </div>
    );
};

export default withBackgroundImage({
    alt: "Clan-Page Brick style background",
    imagePath: backgroundImage as unknown as string,
})(ClanMainPage);
