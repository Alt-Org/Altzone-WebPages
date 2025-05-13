import Image from 'next/image';
import Link from 'next/link';
import googlePLay from '@/shared/assets/images/media/googleplay.png';
import sideImg from '@/shared/assets/images/mainpage/HandGraphicWithBattle.png';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { classNames } from '@/shared/lib/classNames/classNames';
import { NavElement, NavItem } from './NavElement/NavElement';
import cls from './PlayWithUs.module.scss';
import { Container } from '@/shared/ui/Container';

type WebGl = {
    title: string;
    link: string;
    titleDownload?: string;
    text?: string;
    downloadText?: string;
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
        title,
    } = props;

    return (
        <Container
            as={'section'}
            className={cls.SectionPlayWithUs}
            fluid={true}
        >
            {/* <h2 className={cls.title}>
                {title}
            </h2> */}
            <div className={cls.Content}>
                <Image
                    src={sideImg}
                    alt={'Side image with hero'}
                    className={cls.sideImg}
                />
                <div className={cls.ContentWithNav}>
                    <h2 className={cls.title}>{props.title}</h2>
                    <div className={cls.Buttons}>
                        <NavElement
                            className={cls.webGl}
                            navElem={{
                                isExternal: true,
                                title: webGl.title,
                                link: webGl.link,
                                body: webGl.text,
                            }}
                            key={webGl.title}
                        />

                        <NavElement
                            className={cls.webGl}
                            navElem={{
                                isExternal: true,
                                title: webGl.titleDownload,
                                link: googlePLayLink,
                                body: webGl.downloadText,
                            }}
                            key={webGl.title}
                        />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default PlayWithUs;
