import { Navbar } from "@/widgets/Navbar";
import { Footer } from "@/widgets/Footer";
import { FeedbackSideButton } from "@/features/FeedbackByExternalSource";
import { Paragraph } from "@/shared/ui/Paragraph";
import { useServerTranslation } from "@/shared/i18n";
import cls from "./TeachingPackagePage.module.scss"
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import downloadPicture from "@/shared/assets/images/teachingPackage/download.png";
import Image from "next/image";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
// import documento from "./docemento.pdf"


type Props = {
    lng: string
}

const TeachingPackagePage = async ({ lng }: Props) => {

    const { t, i18n } = await useServerTranslation(lng, 'teachingPackage');
    const {language} = i18n;

    return (
        <main className={cls.main}>
            {/*<div className={cls.backgroundImageWrapper}>*/}
            {/*    <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />*/}
            {/*</div>*/}
            <FeedbackSideButton disableMobile={true} />

            <Navbar overlaid />

            {/* Content here */}
            <section className={cls.MainGameArt}>
                <h1>{t("section-title")}</h1>

                <div className={cls.RowTextImg}>
                    <div className={cls.RowText}>
                        <Paragraph
                            text={t("text1")}
                        ></Paragraph>
                        <Paragraph
                            text={t("text2")}
                        ></Paragraph>
                        <Paragraph
                            text={t("text3")}
                        ></Paragraph>
                    </div>

                    <a href={`/documents/Teachingpackages/Teachingpackage_${language}24.pdf`} target={"_blank"} download className={cls.RowImg}>
                        <Image  src={downloadPicture} alt="pdf download disket picture" />
                        <h2 style={{fontSize: "3rem"}}>{t("download")}</h2>
                    </a>

                </div>

            </section>
            {/*  */}

            {/*<Footer />*/}
        </main>
    );
};

export default withBackgroundImage({
    alt: "TeachingPackagePage underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
    // @ts-ignore
})(TeachingPackagePage);
// export default TeachingPackagePage;
