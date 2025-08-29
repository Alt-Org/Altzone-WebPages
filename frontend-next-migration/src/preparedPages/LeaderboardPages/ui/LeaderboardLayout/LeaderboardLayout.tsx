'use client';
import { ReactNode, useState, useEffect, useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { useClientTranslation } from '@/shared/i18n';
import { CustomSwitch, CustomSwitchItems, ToggleLink } from '@/shared/ui/CustomSwitch';
import cls from './LeaderboardLayout.module.scss';
import classNames from 'classnames';

const LeaderboardLayout = ({ children }: { children: ReactNode }) => {
    const { t } = useClientTranslation('leaderboard');
    const params = useParams();
    const lng = (params?.lng ?? '') as string;

    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const pathSegments = (pathname ?? '').split('/').filter(Boolean);
        const newPath = `/${pathSegments.slice(0, 4).join('/')}`;
        setRealPath(newPath);
    }, [pathname]);

    const CustomSwitchElements: ToggleLink[] = useMemo(() => {
        return [
            { children: <p>{t('global')}</p>, path: `/${lng}/leaderboard` },
            { children: <p>{t('clan')}</p>, path: `/${lng}/leaderboard/clans` },
            { children: <p>{t('friends')}</p>, path: `/${lng}/leaderboard/friends` },
        ].map((elem) => ({
            type: CustomSwitchItems.ToggleLink,
            isOpen: elem.path === realPath,
            ...elem,
        }));
    }, [realPath, lng, t]);

    return (
        <LayoutWithSidebars
            className={classNames(cls.LayoutWithSidebars, cls.fullWidthLayout)}
            leftTopSidebar={{ component: undefined }}
        >
            {/* Added the `CenteredContent` class here to control the width and centering. */}
            <main className={classNames(cls.Content, cls.CenteredContent)}>
                <CustomSwitch elements={CustomSwitchElements} />
                {children}
            </main>
        </LayoutWithSidebars>
    );
};

export default LeaderboardLayout;