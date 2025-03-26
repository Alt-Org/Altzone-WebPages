import React, { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import { LayoutWithIntro, LayoutWithSidebars } from '@/preparedPages/Layouts';
import introBg from '@/shared/assets/images/members/members7.webp';
import cls from './Layout.module.scss';
import { useServerTranslation } from '@/shared/i18n';
import { ScrollBottomButton } from './_components/_ScrollBottomButton';
import MemberSidebar from '@/features/NavigateMembers/ui/MemberSidebar';
import TeamHeaderDesktop from './_components/TeamHeaderDesktop/TeamHeaderDesktop';

type Props = {
    children: ReactNode;
    params: {
        lng: string;
    };
};

export default async function TeamLayout({ children, params }: Props) {
    const { lng } = params;

    const { t } = await useServerTranslation(lng, 'members');

    return (
        <div className={cls.MemberContainer}>
            <TeamHeaderDesktop lng={lng} />
            <LayoutWithSidebars
                className={cls.MembersPage}
                leftTopSidebar={{
                    variant: 'wide',
                    component: <MemberSidebar />,
                    hideOnMobile: true,
                }}
            >
                {children}
                <ScrollTop />
            </LayoutWithSidebars>
        </div>
    );
}
