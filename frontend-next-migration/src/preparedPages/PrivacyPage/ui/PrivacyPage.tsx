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
    pageDescription?: string;
};

const PrivacyPage = (props: Props) => {
    const { sections = [], title, pageDescription } = props;

    return (
        <div className={classNames(cls.pageContainer)}>
            <h1 className={cls.pageTitle}>{title}</h1>
            <div className={classNames(cls.accordionContainer)}>
                {pageDescription && (
                    <div>
                        <p dangerouslySetInnerHTML={{ __html: pageDescription }} />
                    </div>
                )}
                <WikiContentWithSidebar
                    title=""
                    sections={sections}
                    enableAccordion={true}
                />
            </div>
            <ScrollTop />
        </div>
    );
};

export default PrivacyPage;
