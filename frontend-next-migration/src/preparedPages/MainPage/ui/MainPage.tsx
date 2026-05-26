'use client';
import { Header } from '@/widgets/Header';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import defenceGallery from '@/shared/assets/images/descriptionCard/defense_gallery.png';
import {
    DescriptionCardMobile,
    DescriptionCardMobileTheme,
} from '@/shared/ui/v2/DescriptionCardMobile';
import defenceGalleryMobile from '@/shared/assets/images/descriptionCard/defense_gallery_mobile.png';
import useSizes from '@/shared/lib/hooks/useSizes';
import { AltZone, AltZoneProps } from './_components/sections/AltZone';
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
import { ContactSection, ContactSectionProps } from './_components/sections/ContactSection';
import { useParams } from 'next/navigation';
import { useClientTranslation } from '@/shared/i18n';
import { WallIntroAnimation } from '@/shared/ui/v2/WallIntroAnimation';
import { CardV2 } from '@/shared/ui/v2/CardV2';
import char1 from '@/shared/assets/images/mainpage/Defencegallery202.png';
import char2 from '@/shared/assets/images/mainpage/Defencegallery403.png';
import char3 from '@/shared/assets/images/mainpage/Defencegallery603.png';
import { Button, ButtonTheme } from '@/shared/ui/v2/Button';

export type Props = {
    projectDescription: ProjectDescriptionProps;
    playWithUs: PlayWithUsProps;
    getToKnowComics: GetToKnowComicsProps;
    videoAndGalleries: VideoAndGalleriesProps;
    altZone: AltZoneProps;
    contactSection: ContactSectionProps;
};

function MainPage(props: Props) {
    const { projectDescription, playWithUs, altZone, contactSection } = props;

    const params = useParams();
    const lng = params.lng as string;
    const lngCode = lng === 'en' ? 'en-US' : lng === 'fi' ? 'fi-FI' : lng;
    const { isMobileSize } = useSizes();
    const { data: latestNews } = useGetNewsQuery({ limit: 2, page: 1 });
    const directusBaseUrl = envHelper.directusHost;
    const groupedNews = formatNews(latestNews || [], lngCode || 'fi-FI');
    const { t } = useClientTranslation('main');

    return (
        <div className={cls.MainPage}>
            <WallIntroAnimation renderOnce />

            <Header />

            <PlayWithUs {...playWithUs} />
            <CardV2
                images={[
                    { src: char1, alt: 'Defense character 1' },
                    { src: char2, alt: 'Defense character 2' },
                    { src: char3, alt: 'Defense character 3' },
                ]}
                title={t('descriptionCard-title')}
                description={t('descriptionCard-description')}
                actions={
                    <Button
                        path="/defense-gallery"
                        theme={ButtonTheme.PRIMARY}
                    >
                        {t('descriptionCard-button')}
                    </Button>
                }
            />
            <ContactSection {...contactSection} />

            <div className={cls.newsSection}>
                <h2 className={cls.newsHeader}>{t('newsSection-title')}</h2>
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
                        {t('newsSection-seeMore')}
                    </a>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
