'use client';
import { ScrollTop } from '@/features/ScrollTop';
import { classNames } from '@/shared/lib/classNames/classNames';
import { WikiContentWithSidebar } from '@/shared/ui/v2/WikiContentWithSidebar';
import cls from './Privacy.module.scss';

/**
 * Represents a section in the privacy policy page
 */
interface Section {
    /** Unique identifier for the section */
    id: string;
    /** Title displayed in the navigation menu */
    navMenuTitle: string;
    /** Main heading label for the section */
    label: string;
    /** HTML content describing the section */
    description: string;
    /** Path to the section's image */
    image: string;
    /** Alt text for the section's image */
    imageAlt: string;
    /** Path to the sidebar logo */
    sidebarLogo: string;
    /** Alt text for the sidebar logo */
    sidebarLogoAlt: string;
}

/**
 * Props for the PrivacyPage component
 */
export type Props = {
    /** Array of privacy policy sections to display */
    sections: Section[];
    /** Main title of the privacy policy page */
    title: string;
    /** Optional page description displayed above sections */
    pageDescription?: string;
};

/**
 * Privacy Policy page component that displays privacy policy content
 * with accordion-style sections and sidebar navigation
 *
 * @param props - Component props
 * @param props.sections - Array of privacy policy sections
 * @param props.title - Main page title
 * @param props.pageDescription - Optional description shown above sections
 * @returns JSX element representing the privacy policy page
 */
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

/**
 * Default export for the PrivacyPage component
 */
export default PrivacyPage;
