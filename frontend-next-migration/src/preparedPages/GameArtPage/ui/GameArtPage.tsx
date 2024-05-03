import { Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";
import { FeedbackSideButton } from "@/features/FeedbackByExternalSource";
import { Paragraph } from "@/shared/ui/Paragraph";
import { useServerTranslation } from "@/shared/i18n";
import cls from "./GameArtPage.module.scss"
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import gamePicture from "@/shared/assets/images/gameArt/gameArt.png";
import Image from "next/image";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";


type Props = {
    lng: string
}

const GameArtPage = async ({ lng }: Props) => {

    const { t } = await useServerTranslation(lng, 'gameArt');

    return (
        <main className={cls.main}>
            <FeedbackSideButton disableMobile={true} />

            <Navbar overlaid />

            {/* Content here */}
            <section className={cls.MainGameArt}>
                <h1>{t("section-title")}</h1>
                <Paragraph
                    text={t("text1")}
                ></Paragraph>
                <div className={cls.RowTextImg}>
                    <div className={cls.RowText}>
                        <Paragraph
                            text={t("text2")}
                        ></Paragraph>
                    </div>
                    <Image className={cls.RowImg} src={gamePicture} alt="gamepad image"/>
                </div>

            </section>
        </main>





    );
};

export default withBackgroundImage({
    alt: "TeachingPackagePage underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
    // @ts-ignore
})(GameArtPage);

// export default GameArtPage;
