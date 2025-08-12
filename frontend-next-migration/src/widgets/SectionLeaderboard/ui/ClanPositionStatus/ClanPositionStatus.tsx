'use client';
import React from 'react';
import Link from 'next/link';
import { useGetClanPositionQuery } from '@/shared/api/leaderboardApi';
import { useClientTranslation } from '@/shared/i18n';
import { getRouteLoginPage } from '@/shared/appLinks/RoutePaths';
import styles from './ClanPositionStatus.module.scss';

const ClanPositionStatus = () => {
    const { t } = useClientTranslation('leaderboard');
    // Always call; we rely on HTTP status for auth vs not-in-clan
    const { data, isLoading, isError, error } = useGetClanPositionQuery();

    if (isLoading) {
        return <div className={styles.statusBox}>{t('loading_position')}</div>;
    }

    if (isError) {
        const status = (error as any)?.status ?? (error as any)?.originalStatus;
        if (status === 401) {
            // Not authenticated
            return (
                <div className={styles.statusBox}>
                    {t('not_logged_in_position')}{' '}
                    <Link
                        href={getRouteLoginPage()}
                        className={styles.link}
                    >
                        {t('login')}
                    </Link>
                </div>
            );
        }
        // Any other unexpected failure
        return <div className={styles.statusBox}>{t('unexpected_error')}</div>;
    }

    // At this point, either 200 or normalized 404:
    const position = data?.data?.Object?.position; // number | null
    if (position === null) {
        return <div className={styles.statusBox}>{t('not_in_clan')}</div>;
    }

    return <div className={styles.statusBox}>{t('your_clan_position', { position })}</div>;
};

export default ClanPositionStatus;
