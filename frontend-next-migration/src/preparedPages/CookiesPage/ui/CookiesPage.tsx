'use client';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { ScrollTop } from '@/features/ScrollTop';
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
            <ScrollTop />
        </div>
    );
};

export default CookiesPage;
