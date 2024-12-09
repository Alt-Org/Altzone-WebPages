import { SectionGalleryV2, SectionGalleryV1 } from '@/widgets/SectionGallery';
import { Container } from '@/shared/ui/Container';
import cls from './PictureGalleryPage.module.scss';
import { YouTubeFacade } from '@/shared/ui/YouTubeFacade';

// import { SectionGallerias } from '@/widgets/SectionGallerias';
// import { SectionGalleriasPaths } from "@/shared/const/SectionGalleriasPaths";

export interface Props {
    title: string;
    infoText: string;
    socialsText: string;
    socialMediaLinks: string[];
    videoLink: string;
}

const PictureGalleryPage = (props: Props) => {
    const { title, infoText, socialsText, socialMediaLinks, videoLink } = props;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>{title}</h1>
                <p className={cls.InfoText}>{infoText}</p>
                {/*<p className={cls.SocialsText}>{socialsText}</p>*/}

                {/* <SectionGallerias parentDirectory={SectionGalleriasPaths.artGalleries} /> */}

                {/*version1*/}
                <SectionGalleryV1
                    socialMediaLinks={socialMediaLinks}
                    videoLink={videoLink}
                />

                <div className={cls.videoWrapper}>
                    <YouTubeFacade previewVideoYoutube={videoLink} />
                </div>

                {/*<SectionGallerias parentDirectory={SectionGalleriasPaths.galleries} />*/}
                {/*<SectionGallerias parentDirectory={SectionGalleriasPaths.comics} />*/}

                {/* version2 */}
                <SectionGalleryV2
                    version={'full'}
                    socialMediaLinks={socialMediaLinks}
                />
            </Container>
        </div>
    );
};

export default PictureGalleryPage;
