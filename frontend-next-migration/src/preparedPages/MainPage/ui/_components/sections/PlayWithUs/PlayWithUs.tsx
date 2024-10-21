import Image from 'next/image';
import Link from 'next/link';
import googlePLay from '@/shared/assets/images/media/googleplay.png';
import sideImg from '@/shared/assets/images/heros/einstein/professori.webp';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NavElement, NavItem } from './NavElement/NavElement';
import cls from './PlayWithUs.module.scss';

type WebGl = {
    title: string;
    link: string;
};

export type Props = {
    title: string;
    webGl: WebGl;
    googlePLayLink: string;
    belowNavs: NavItem[];
    webGlNotice: string;
};

const PlayWithUs = (props: Props) => {
    const {
        webGl,
        googlePLayLink = AppExternalLinks.downloadAndroid,
        belowNavs,
        webGlNotice,
    } = props;

    return (
        <section className={cls.SectionPlayWithUs}>
            {/* <h2 className={cls.title}>
                {title}
            </h2> */}
            <div className={cls.Content}>
                <div className={cls.ContentWithNav}>
                    <div className={cls.Buttons}>
                        <NavElement
                            className={cls.webGl}
                            navElem={{
                                isExternal: true,
                                title: webGl.title,
                                link: webGl.link,
                            }}
                            key={webGl.title}
                        />

                        <Link
                            href={googlePLayLink}
                            target={'_blank'}
                            className={cls.BtnDownloadWrapper}
                        >
                            <Image
                                src={googlePLay}
                                alt={'google play button'}
                                className={cls.BtnDownload}
                            />
                        </Link>
                    </div>

                    <div className={classNames(cls.NavElements, {}, [])}>
                        {belowNavs.map((item) => (
                            <NavElement
                                navElem={item}
                                key={item.title}
                            />
                        ))}
                    </div>
                </div>

                <Image
                    src={sideImg}
                    alt={'Side image with hero'}
                    className={cls.sideImg}
                />
            </div>
            <div className={cls.WebGLNotice}>
                <span className={cls.WarningIcon}>▲</span>
                {webGlNotice}
            </div>
        </section>
    );
};

export default PlayWithUs;
