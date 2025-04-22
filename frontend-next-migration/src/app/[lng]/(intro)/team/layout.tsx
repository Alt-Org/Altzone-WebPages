'use client';
import React, { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import cls from './Layout.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames } from '@/shared/lib/classNames/classNames';
import TeamHeader from '@/shared/ui/TeamHeader';
import MembersNavMenu from '@/features/NavigateMembers';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import headerImg from '@/shared/assets/images/members/members8.webp';

type Props = {
    children: ReactNode;
};

export default function TeamLayout({ children }: Props) {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;

    return isTouchDevice ? (
        <div
            id={'members'}
            className={classNames(cls.MembersPageMobile)}
        >
            <TeamHeader
                image={headerImg}
                dropdown={<MembersNavMenu />}
            />
            {children}
            <ScrollTop />
        </div>
    ) : (
        <div
            id={'members'}
            className={classNames(cls.MembersPage)}
        >
            <TeamHeader image={headerImg} />
            <LayoutWithSidebars
                className={cls.TeamPageSidebar}
                leftTopSidebar={{
                    component: <MembersNavMenu />,
                    hideOnMobile: true,
                }}
            >
                {children}
                <ScrollTop />
            </LayoutWithSidebars>
        </div>
    );
}
