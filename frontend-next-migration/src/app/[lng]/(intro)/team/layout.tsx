import React, { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import cls from './Layout.module.scss';
import { useServerTranslation } from '@/shared/i18n';
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
            {children}
            <ScrollTop />
        </div>
    );
}
