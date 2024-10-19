'use client';
import { Footer } from '@/widgets/Footer';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { ScrollTop } from '@/features/ScrollTop';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { WikiContentWithSidebar } from '@/shared/ui/WikiContentWithSidebar';
import cls from './CookiesPage.module.scss';

interface Section {
    id: string;
    label: string;
    description: string;
    image: string;
    imageAlt: string;
    sidebarLogo: string;
    sidebarLogoAlt: string;
}

export type Props = {
    sections: Section[];
};

const CookiesPage = (props: Props) => {
    const { sections = [] } = props;

    return (
        <div className={classNames(cls.pageContainer)}>
            <WikiContentWithSidebar sections={sections} />
            <div>
                <FeedbackSideButton />
            </div>
            <Footer />
            <ScrollTop />
        </div>
    );
};

export default withBackgroundImage<Props>({
    alt: 'Tile bg image',
    imagePath: bgPicture as unknown as string,
})(CookiesPage);
