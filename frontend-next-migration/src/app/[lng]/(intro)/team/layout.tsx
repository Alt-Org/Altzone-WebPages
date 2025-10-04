'use client';
import React, { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import cls from './Layout.module.scss';
import useSizes from '@/shared/lib/hooks/useSizes';
import { classNames } from '@/shared/lib/classNames/classNames';
import MembersNavMenu from '@/features/NavigateMembers';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { ScrollBottomButton } from './_components/_ScrollBottomButton';
import play from '@/shared/assets/icons/playIcon.svg';
import { TeamHeaderWithMosaic } from '@/shared/ui/TeamHeaderWithMosaic/ui/TeamHeaderWithMosaic';

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
            <TeamHeaderWithMosaic dropdown={<MembersNavMenu />} />
            <div className={cls.buttonContainer}>
                <ScrollBottomButton
                    IdToScrollBeforePlay={'members'}
                    className={cls.diveButton}
                    image={play}
                />
            </div>
            {children}
            <ScrollTop />
        </div>
    ) : (
        <div
            id={'members'}
            className={classNames(cls.MembersPage)}
        >
            <TeamHeaderWithMosaic />
            <LayoutWithSidebars
                className={cls.TeamPageSidebar}
                leftTopSidebar={{
                    component: <MembersNavMenu />,
                    hideOnMobile: true,
                }}
            >
                <div className={cls.buttonContainer}>
                    <ScrollBottomButton
                        IdToScrollBeforePlay={'members'}
                        className={cls.diveButton}
                        image={play}
                    />
                </div>
                {children}
                <ScrollTop />
            </LayoutWithSidebars>
        </div>
    );
}
