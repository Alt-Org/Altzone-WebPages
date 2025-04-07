'use client';
import { SectionMembers } from '@/widgets/SectionMembers';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MembersPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { TableOfContents } from '@/shared/ui/TableOfContents';
import TeamHeaderDesktop from '@/shared/ui/TeamHeaderDesktop';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useClientTranslation } from '@/shared/i18n';

/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component.
 */

interface Section {
    id: string;
    label: string;
    description: string;
    image: string;
    imageAlt: string;
}

export type Props = {
    sections: Section[];
};

const MembersPage = (props: Props) => {
    const { sections = [] } = props;
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    sections.map((section) => (section.id = section.label));

    const { t } = useClientTranslation('members');
    const title = t('Tableofcontent-title');

    return (
        <div
            id={'members'}
            className={classNames(cls.MembersPage)}
        >
            <TeamHeaderDesktop image={sections[0].image} />
            <LayoutWithSidebars
                className={cls.TeamPageSidebar}
                leftTopSidebar={{
                    variant: 'wide',
                    component: (
                        <TableOfContents
                            sections={sections}
                            className={cls.TeamSideBar}
                            title={title}
                        />
                    ),
                    hideOnMobile: true,
                }}
            >
                {isTouchDevice && <h2>Dropdown here</h2>}
                <SectionMembers className={cls.workersSection} />
            </LayoutWithSidebars>
        </div>
    );
};

export default MembersPage;
