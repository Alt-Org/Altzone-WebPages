'use client';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import defenceGallery from '@/shared/assets/images/descriptionCard/defense_gallery.png';
import {
    DescriptionCardMobile,
    DescriptionCardMobileTheme,
} from '@/shared/ui/v2/DescriptionCardMobile';
import defenceGalleryMobile from '@/shared/assets/images/descriptionCard/defense_gallery_mobile.png';
import useSizes from '@/shared/lib/hooks/useSizes';
import { Gallery, GalleryProps } from './_components/sections/Gallery';
import { GetToKnowComicsProps } from './_components/sections/GetToKnowComics';
import { PlayWithUs, PlayWithUsProps } from './_components/sections/PlayWithUs';
import { NewsCard } from '@/widgets/NewsCard';
import { useGetNewsQuery, formatNews } from '@/entities/NewsV2';
import { envHelper } from '@/shared/const/envHelper';
import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import {
    ProjectDescription,
    ProjectDescriptionProps,
} from './_components/sections/ProjectDescription';
import { VideoAndGalleriesProps } from './_components/sections/VideoAndGalleries';
import cls from './page.module.scss';
import { WallIntroAnimation } from '@/shared/ui/v2/WallIntroAnimation';
import { ContactSection, ContactSectionProps } from './_components/sections/ContactSection';

export type Props = {
    projectDescription: ProjectDescriptionProps;
    playWithUs: PlayWithUsProps;
    getToKnowComics: GetToKnowComicsProps;
    videoAndGalleries: VideoAndGalleriesProps;
    gallery: GalleryProps;
    galleryCopy: GalleryProps;
    contactSection: ContactSectionProps;
};

function MainPage(props: Props) {
    const {
        projectDescription,
        playWithUs,
        // getToKnowComics,
        // classifiedHeroesBlocks,
        gallery,
        contactSection,
    } = props;

    const { isMobileSize } = useSizes();
    const { data: latestNews } = useGetNewsQuery({ limit: 2, page: 1 });
    const directusBaseUrl = envHelper.directusHost;
    const groupedNews = formatNews(latestNews || [], 'fi-FI');

    return (
        <div className={cls.MainPage}>
            <WallIntroAnimation renderOnce={true} />
            <ProjectDescription
                className={cls.description}
                {...projectDescription}
            />

            <PlayWithUs {...playWithUs} />

            {/*<HorizontalLines />*/}

            {/*<VideoAndGalleries*/}
            {/*    {...videoAndGalleries}*/}
            {/*/>*/}
            {isMobileSize ? (
                <div className={cls.descriptionCardMobile}>
                    <a
                        className={cls.cardLink}
                        href={`/defense-gallery`}
                        rel="noopener noreferrer"
                    >
                        <DescriptionCardMobile theme={DescriptionCardMobileTheme.DEFENSEGALLERY}>
                            <DescriptionCardMobile.Texts title="Tutustu Defenssiluokkiimme" />
                            <DescriptionCardMobile.Image
                                src={defenceGalleryMobile}
                                alt="defense gallery mobile"
                            />
                        </DescriptionCardMobile>
                    </a>
                </div>
            ) : (
                <div className={cls.descriptionCard}>
                    <a
                        className={cls.cardLink}
                        href={`/defense-gallery`}
                        rel="noopener noreferrer"
                    >
                        <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                            <DescriptionCard.Texts width="25%">
                                <DescriptionCard.Texts.Title>
                                    Tutustu Defenssiluokkiimme
                                </DescriptionCard.Texts.Title>
                            </DescriptionCard.Texts>
                            <DescriptionCard.Image width="65%">
                                <DescriptionCard.Image.Image
                                    src={defenceGallery}
                                    alt="defence gallery"
                                />
                            </DescriptionCard.Image>
                        </DescriptionCard>
                    </a>
                </div>
            )}
            <Gallery {...gallery} />
            <div className={cls.newsSection}>
                <h2 className={cls.newsHeader}>Alt Uutiset</h2>
                <div className={cls.newsGrid}>
                    {groupedNews.map((news) => {
                        const imageSrc = news.titlePicture?.id
                            ? `${directusBaseUrl}/assets/${news.titlePicture.id}`
                            : hannu.src;
                        return (
                            <NewsCard
                                key={news.id}
                                titlePicture={imageSrc}
                                title={news.title}
                                previewText={news.previewText}
                                date={news.date}
                                id={news.id}
                            />
                        );
                    })}
                </div>
                <div className={cls.linkWrapper}>
                    <a
                        className={cls.link}
                        href={`/news`}
                        rel="noopener noreferrer"
                    >
                        Lue lisää
                    </a>
                </div>
            </div>
            <ContactSection {...contactSection} />

            {/*<Gallery {...galleryCopy} />*/}

            {/*<HorizontalLines />*/}
            {/*<SectionRanking*/}
            {/*    rankingPlayerText={t('ranking-player')}*/}
            {/*    rankingScoreText={t('ranking-score')}*/}
            {/*/>*/}

            {/*<HorizontalLines />*/}
            {/*<PlayWithUs*/}
            {/*    {...playWithUs}*/}
            {/*/>*/}

            {/*<GetToKnowComics*/}
            {/*    backgroundImageSrc={sameBg}*/}
            {/*    {...getToKnowComics}*/}
            {/*/>*/}

            {/*<HorizontalLines />*/}
            {/*<VideoAndGalleries*/}
            {/*    backgroundImageSrc={sameBg}*/}
            {/*    {...videoAndGalleries}*/}
            {/*/>*/}
            {/*<HorizontalLines />*/}
            {/*<SectionNewsPreview/>*/}

            {/*<SectionRanking*/}
            {/*    rankingPlayerText={t('ranking-player')}*/}
            {/*    rankingScoreText={t('ranking-score')}*/}

            {/*/>*/}
            {/*</div>*/}
        </div>
    );
}

export default MainPage;
