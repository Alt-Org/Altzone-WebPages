'use client';
import { ScrollTop } from '@/features/ScrollTop';
import { classNames } from '@/shared/lib/classNames/classNames';
import { WikiContentWithSidebar } from '@/shared/ui/v2/WikiContentWithSidebar';
import cls from './EthicalGuidelinesPage.module.scss';

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

const EthicalGuidelinesPage = (props: Props) => {
    const { sections = [], title } = props;

    return (
        <div className={classNames(cls.pageContainer)}>
            <WikiContentWithSidebar
                sections={sections}
                title={title}
            />
            <ScrollTop />
        </div>
    );
};

export default EthicalGuidelinesPage;
