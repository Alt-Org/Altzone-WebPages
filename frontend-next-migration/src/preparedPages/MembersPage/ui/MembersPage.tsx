'use client';
import { SectionMembers } from '@/widgets/SectionMembers';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MembersPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { TableOfContents } from '@/shared/ui/TableOfContents';
import TeamHeaderDesktop from '@/shared/ui/TeamHeaderDesktop';

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
    sections.map((section) => (section.id = section.label));

    return (
        <div
            id={'members'}
            className={classNames(cls.MembersPage)}
        >
            <TeamHeaderDesktop image={sections[0].image} />
            <LayoutWithSidebars
                className={cls.MembersPage}
                leftTopSidebar={{
                    variant: 'wide',
                    component: <TableOfContents sections={sections} />,
                }}
            >
                <SectionMembers className={cls.workersSection} />
            </LayoutWithSidebars>
        </div>
    );
};

export default MembersPage;
