'use client';
import { ScrollTop } from '@/features/ScrollTop';
import { classNames } from '@/shared/lib/classNames/classNames';
import { WikiContentWithSidebar } from '@/shared/ui/WikiContentWithSidebar';
import cls from './Privacy.module.scss';

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

const PrivacyPage = (props: Props) => {
    const { sections = [] } = props;

    return (
        <div className={classNames(cls.pageContainer)}>
            <WikiContentWithSidebar sections={sections} />
            <ScrollTop />
        </div>
    );
};

export default PrivacyPage;
