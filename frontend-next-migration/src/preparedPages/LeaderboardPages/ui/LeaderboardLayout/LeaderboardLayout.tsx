'use client';
import { ReactNode, useState, useEffect, useMemo } from 'react';
import { useParams, usePathname } from 'next/navigation';
import { useClientTranslation } from '@/shared/i18n';
import { CustomSwitch, CustomSwitchItems, ToggleLink } from '@/shared/ui/CustomSwitch';
import { PageTitle } from '@/shared/ui/PageTitle';
import cls from './LeaderboardLayout.module.scss';

const LeaderboardLayout = ({ children }: { children: ReactNode }) => {
    const { t } = useClientTranslation('leaderboard');
    const params = useParams();
    const lng = params.lng as string;

    const [realPath, setRealPath] = useState('/');
    const pathname = usePathname();

    useEffect(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        const newPath = `/${pathSegments.slice(0, 4).join('/')}`;
        // console.log(newPath);
        // console.log(pathSegments);
        setRealPath(newPath);
    }, [pathname]);

    const CustomSwitchElements: ToggleLink[] = useMemo(() => {
        return [
            {
                children: <p>{t('global')}</p>,
                path: `/${lng}/leaderboard`,
            },
            {
                children: <p>{t('clan')}</p>,
                path: `/${lng}/leaderboard/clans`,
            },
            {
                children: <p>{t('friends')}</p>,
                path: `/${lng}/leaderboard/friends`,
            },
        ].map((elem) => {
            return {
                type: CustomSwitchItems.ToggleLink,
                isOpen: elem.path === realPath,
                ...elem,
            };
        });
    }, [realPath, lng]);

    return (
        <div className={cls.LayoutWrapper}>
            <main className={cls.Content}>
                <div className={cls.InnerContainer}>
                    <PageTitle
                        titleText={t('head-title')}
                        searchVisible={false}
                        dynamicTitle="leaderboard"
                    />
                    <CustomSwitch elements={CustomSwitchElements} />
                    {children}
                </div>
            </main>
        </div>
    );
};

export default LeaderboardLayout;
