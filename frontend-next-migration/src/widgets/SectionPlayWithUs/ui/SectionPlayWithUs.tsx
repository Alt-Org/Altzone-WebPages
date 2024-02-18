import cls from "./SectionPlayWithUs.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/PlayWithUs.webp";
import googlePLay from "@/shared/assets/images/media/googleplay.webp";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import Link from "next/link";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";

type Props = {
    webGlButtonText: string;
    // googleButtonText: string;
}

const SectionPlayWithUs = (props : Props) => {

    const {
        webGlButtonText,
        // googleButtonText
    } = props;


    return (
        <div className={cls.SectionPlayWithUs}>


            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100}/>
            </div>


            <div className={cls.Buttons}>
                <Button key={"webgl"} withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL}
                        className={cls.BtnGame}>
                    <Link target={"_blank"} href={AppExternalLinks.webgl}>
                        {webGlButtonText}
                    </Link>
                </Button>

                {/*todo fix the picture`s borders*/}
                <Link href={AppExternalLinks.downloadAndroid} target={"_blank"}>
                    <Image src={googlePLay} alt={"google play button"}/>
                </Link>

                {/*<Button key={"feedback"} withScalableLink theme={ButtonTheme.Graffiti} size={ButtonSize.XXXL}*/}
                {/*        className={cls.BtnGame}>*/}
                {/*    <Link target={"_blank"} href={AppExternalLinks.webgl}>*/}
                {/*        {webGlButtonText}*/}
                {/*    </Link>*/}
                {/*</Button>*/}


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