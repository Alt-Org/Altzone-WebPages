'use client';
import React, { useMemo } from 'react';
import {
    NavMenuWithDropdowns,
    NavMenuWithDropdownsProps,
    DropDownElementASTextOrLink,
} from '@/shared/ui/NavMenuWithDropdownsV2';
import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useGetMemberTeamsQuery } from '@/entities/Member/api/memberTeamsApi';
import { getLanguageCode, getTeamTranslation } from '@/entities/Member/api/translations';
import { useParams } from 'next/navigation';
import cls from './MemberNavMenuAsDropdown.module.scss';
import { organizeTeams } from '@/entities/Member/api/mappers';

export const MembersNavMenu: React.FC = () => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;
    const { t } = useClientTranslation('members');
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

    const sections = useMemo(() => {
        return teams.map((team) => ({
            id: team.id,
            label: getTeamTranslation(team.translations || [], fullLanguageCode),
        }));
    }, [teams, fullLanguageCode]);

    const sortedSections = organizeTeams(sections, lng);

    const dropdownItems: DropDownElementASTextOrLink[] = sortedSections.map((section) => ({
        title: section.label,
        openByDefault: false,
        elementText: section.label,
        link: { path: '#' + section.label, isExternal: false },
    }));

    const navMenuWithDropdownsMobileProps: NavMenuWithDropdownsProps = {
        title: t('Tableofcontent-title'),
        openByDefault: false,
        dropdownItems: dropdownItems,
    };

    const navMenuWithDropdownsDesktopProps: NavMenuWithDropdownsProps = {
        title: t('Tableofcontent-title'),
        openByDefault: true,
        staticDropdown: true,
        dropdownItems: dropdownItems,
    };

    return (
        <div>
            <nav style={isTouchDevice ? { display: 'contents' } : { display: 'none' }}>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsMobileProps}
                />
            </nav>
            <nav style={isTouchDevice ? { display: 'none' } : { display: 'block' }}>
                <NavMenuWithDropdowns
                    className={cls.Width}
                    {...navMenuWithDropdownsDesktopProps}
                />
            </nav>
        </div>
    );
};
