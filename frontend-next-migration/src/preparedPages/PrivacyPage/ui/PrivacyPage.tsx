'use client';
import { ScrollTop } from '@/features/ScrollTop';
import { classNames } from '@/shared/lib/classNames/classNames';
import { WikiContentWithSidebar } from '@/shared/ui/v2/WikiContentWithSidebar';
import cls from './Privacy.module.scss';

interface Section {
    id: string;
    navMenuTitle: string;
    label: string;
    description: string;
    image: string;
    imageAlt: string;
    sidebarLogo: string;
    sidebarLogoAlt: string;
}

export type Props = {
    sections: Section[];
    title: string;
};

const PrivacyPage = (props: Props) => {
    const { sections = [], title } = props;

    return (
        <div className={classNames(cls.pageContainer)}>
            <WikiContentWithSidebar
                title={title}
                sections={sections}
            />
            <ScrollTop />
        </div>
    );
};

export default PrivacyPage;
