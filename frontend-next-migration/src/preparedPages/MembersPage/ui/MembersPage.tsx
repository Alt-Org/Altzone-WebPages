'use client';
import { SectionMembers } from '@/widgets/SectionMembers';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MembersPage.module.scss';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import useSizes from '@/shared/lib/hooks/useSizes';
import { TeamHeader } from '@/shared/ui/TeamHeader/ui/TeamHeader';
import { FC } from 'react';
import headerImg from '@/shared/assets/images/members/members8.webp';
import { MembersNavMenu } from '@/features/NavigateMembers/ui/MemberNavMenuAsDropdown';

/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component.
 */

const MembersPage: FC = () => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;

    return isTouchDevice ? (
        <div
            id={'members'}
            className={classNames(cls.MembersPageMobile)}
        >
            <TeamHeader image={headerImg}>
                <LayoutWithSidebars
                    className={cls.TeamPageSidebar}
                    leftTopSidebar={{
                        component: <MembersNavMenu />,
                        hideOnMobile: false,
                    }}
                >
                    <SectionMembers className={cls.workersMobileSection} />
                </LayoutWithSidebars>
            </TeamHeader>
        </div>
    ) : (
        <div
            id={'members'}
            className={classNames(cls.MembersPageMobile)}
        >
            <TeamHeader image={headerImg} />
            <LayoutWithSidebars
                className={cls.TeamPageSidebar}
                leftTopSidebar={{
                    component: <MembersNavMenu />,
                    hideOnMobile: false,
                }}
            >
                <SectionMembers className={cls.workersSection} />
            </LayoutWithSidebars>
        </div>
    );
};

export default MembersPage;
