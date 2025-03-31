'use client';
import { FC, useEffect, useMemo, useState } from 'react';
import { SectionMembers } from '@/widgets/SectionMembers';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MembersPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { TableOfContents } from '@/shared/ui/TableOfContents';
import { useParams } from 'next/navigation';
import { useGetMemberTeamsQuery } from '@/entities/Member/api/memberTeamsApi';
import { getLanguageCode, getTeamTranslation } from '@/entities/Member/api/translations';

/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component.
 */
const MembersPage: FC = () => {
    const [section, setSection] = useState<{ id: string; label: string }[]>([]);
    /* const sections = [
       { id: 'section1', label: 'Section 1' },
       { id: 'section2', label: 'Section 2' },
       { id: 'section3', label: 'Section 3' },
    ];*/

    const params = useParams();
    const lng = params.lng as string;
    const fullLanguageCode = getLanguageCode(lng);

    const {
        data: teams = [],
        isError,
        isLoading,
    } = useGetMemberTeamsQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });

    const teamOptions = useMemo(() => {
        return teams.map((team) => ({
            id: getTeamTranslation(team.translations || [], fullLanguageCode),
            label: getTeamTranslation(team.translations || [], fullLanguageCode),
        }));
    }, [teams, fullLanguageCode]);

    useEffect(() => {
        setSection(teamOptions);
    }, [teamOptions]);

    return (
        <div
            id={'members'}
            className={classNames(cls.MembersPage)}
        >
            <LayoutWithSidebars
                className={cls.MembersPage}
                leftTopSidebar={{
                    variant: 'wide',
                    component: <TableOfContents sections={section} />,
                }}
            >
                <SectionMembers className={cls.workersSection} />
            </LayoutWithSidebars>
        </div>
    );
};

export default MembersPage;
