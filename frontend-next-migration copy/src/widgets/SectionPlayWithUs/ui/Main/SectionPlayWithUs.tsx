import cls from "./SectionPlayWithUs.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import googlePLay from "@/shared/assets/images/media/googleplay.png";
import sideImg from "@/shared/assets/images/heros/einstein/professori.webp";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";
import { NavElements } from "../NavElements/NavElements";
import { Navs } from "../../model/data/navs";



type Props = {
    webGlButtonText: string;
    backgroundImageSrc? : string;
    // googleButtonText: string;
}



const SectionPlayWithUs = (props: Props) => {

    const {
        webGlButtonText,
        backgroundImageSrc
    } = props;

    return (
        <section
            className={cls.SectionPlayWithUs}
            style={{ backgroundImage: backgroundImageSrc ? `url(${backgroundImageSrc})` : 'none' }}
        >

            <div className={cls.Content}>

                <div className={cls.ContentWithNav}>
                    <div className={cls.Buttons}>
                        <Button
                            key={"webgl"}
                            withScalableLink
                            theme={ButtonTheme.Graffiti}
                            // size={ButtonSize.}
                            className={cls.BtnGame}
                        >
                            <Link target={"_blank"} href={AppExternalLinks.webgl}>
                                {webGlButtonText}
                            </Link>
                        </Button>

                        <Link href={AppExternalLinks.downloadAndroid} target={"_blank"}>
                            <Image src={googlePLay} alt={"google play button"}
                                className={cls.BtnDownload}
                            />
                        </Link>
                    </div>
                    <NavElements navElems={Navs} className={cls.navElements} />
                </div>

                <Image src={sideImg} alt={"Side image with hero"} className={cls.sideImg} />

            </div>

        </section>

    );
};

export default SectionPlayWithUs;