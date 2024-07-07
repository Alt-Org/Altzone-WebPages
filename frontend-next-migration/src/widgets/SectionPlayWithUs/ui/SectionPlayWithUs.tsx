import cls from "./SectionPlayWithUs.module.scss"
import Image from "next/image";
import googlePLay from "@/shared/assets/images/media/googleplay.png";
import sideImg from "@/shared/assets/images/heros/einstein/professori.webp";
import { Button, ButtonTheme } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";
import { Navs } from "../model/data/navs";
import {classNames} from "@/shared/lib/classNames/classNames";
import {NavElement} from "@/widgets/SectionPlayWithUs/ui/NavElement/NavElement";


type WebGl = {
    title: string;
    link: string;
}


type Props = {
    webGl: WebGl;
}



const SectionPlayWithUs = (props: Props) => {

    const {
        webGl
    } = props;

    return (
        <section className={cls.SectionPlayWithUs}>

            <h3 className={cls.title}>
                {"title"}
            </h3>


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
                            {/*<Link target={"_blank"} href={AppExternalLinks.webgl}>*/}
                            <Link target={"_blank"} href={webGl.link}>
                                {webGl.title}
                                {/*{webGlButtonText}*/}
                            </Link>
                        </Button>

                        <Link href={AppExternalLinks.downloadAndroid} target={"_blank"}>
                            <Image src={googlePLay} alt={"google play button"}
                                   className={cls.BtnDownload}
                            />
                        </Link>
                    </div>


                    <div className={classNames(cls.NavElements, {}, [cls.navElements])}>
                        {Navs.map((item) => (
                            <NavElement navElem={item} key={item.title}/>
                        ))}
                    </div>


                </div>

                <Image src={sideImg} alt={"Side image with hero"} className={cls.sideImg}/>

            </div>

        </section>

    );
};

export default SectionPlayWithUs;