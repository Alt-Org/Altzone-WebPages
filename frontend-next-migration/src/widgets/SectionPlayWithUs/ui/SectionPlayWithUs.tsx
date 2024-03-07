import cls from "./SectionPlayWithUs.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/PlayWithUs.webp";
import googlePLay from "@/shared/assets/images/media/googleplay.png";
import appStore from "@/shared/assets/images/media/appstore.png";
import einstein from "@/shared/assets/images/heros/einstein/einstein.png";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";

type Props = {
    webGlButtonText: string;
    // googleButtonText: string;
}

const SectionPlayWithUs = (props: Props) => {

    const {
        webGlButtonText,
        // googleButtonText
    } = props;


    return (
        <div className={cls.SectionPlayWithUs}>


            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
            </div>

            <div className={cls.Content}>
                <div className={cls.Buttons}>
                    <Button key={"webgl"} withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL}
                        className={cls.BtnGame}>
                        <Link target={"_blank"} href={AppExternalLinks.webgl}>
                            {webGlButtonText}
                        </Link>
                    </Button>
                    <div className={cls.MediaLinks}>
                        {/*todo improve de images quality*/}
                        <Link href={AppExternalLinks.downloadAndroid} target={"_blank"}>
                            <Image src={googlePLay} alt={"google play button"}
                                className={cls.BtnDownload}
                            />
                        </Link>

                        <Link href={AppExternalLinks.downloadAndroid} target={"_blank"}>
                            <Image src={appStore} alt={"app store button"}
                                className={cls.BtnDownload}
                            />
                        </Link>


                    </div>

                    {/*<Button key={"feedback"} withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL}*/}
                    {/*        className={cls.BtnGame}>*/}
                    {/*    <Link target={"_blank"} href={AppExternalLinks.webgl}>*/}
                    {/*        {webGlButtonText}*/}
                    {/*    </Link>*/}
                    {/*</Button>*/}


                </div>
                
                <Image src={einstein} alt={"Einstein hero photo"} className={cls.EinsteinImage}></Image>
                
            </div>






            {/*<Button key={"android"} withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL}*/}
            {/*        className={cls.BtnGame}>*/}
            {/*    <Link target={"_blank"} href={AppExternalLinks.webgl}>*/}
            {/*        {googleButtonText}*/}
            {/*    </Link>*/}
            {/*</Button>*/}


        </div>
    );
};

export default SectionPlayWithUs;