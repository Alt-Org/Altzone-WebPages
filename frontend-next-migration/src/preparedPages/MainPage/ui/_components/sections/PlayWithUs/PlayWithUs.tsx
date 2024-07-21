import cls from "./PlayWithUs.module.scss"
import Image from "next/image";
import googlePLay from "@/shared/assets/images/media/googleplay.png";
import sideImg from "@/shared/assets/images/heros/einstein/professori.webp";
import Link from "next/link";
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";
import {classNames} from "@/shared/lib/classNames/classNames";
import {NavElement, NavItem} from "./NavElement/NavElement";


type WebGl = {
    title: string;
    link: string;
}

export type Props = {
    title: string;
    webGl: WebGl;
    googlePLayLink: string;
    belowNavs: NavItem[]
}

const PlayWithUs = (props: Props) => {

    const {
        title,
        webGl,
        googlePLayLink= AppExternalLinks.downloadAndroid,
        belowNavs
    } = props;

    return (
        <section className={cls.SectionPlayWithUs}>

            <h3 className={cls.title}>
                {title}
            </h3>
            <div className={cls.Content}>
                <div className={cls.ContentWithNav}>
                    <div className={cls.Buttons}>

                        <NavElement
                            className={cls.webGl}
                            navElem={{
                            isExternal: true,
                            title: webGl.title,
                            link: webGl.link,
                        }} key={webGl.title}/>

                        <Link href={googlePLayLink} target={"_blank"}>
                            <Image src={googlePLay} alt={"google play button"}
                                   className={cls.BtnDownload}
                            />
                        </Link>


                    </div>


                    <div className={classNames(cls.NavElements, {}, [cls.navElements])}>
                        {belowNavs.map((item) => (
                            <NavElement navElem={item} key={item.title}/>
                        ))}
                    </div>


                </div>

                <Image src={sideImg} alt={"Side image with hero"} className={cls.sideImg}/>

            </div>

        </section>

    );
};

export default PlayWithUs;