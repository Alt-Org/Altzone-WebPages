import { memo } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './LeaderboardCard.module.scss';

interface LeaderboardCardProps {
    element: LeaderboardItem;
    position: number;
    path?: string;
    className?: string;
}

const LeaderboardCard = memo(({ element, position, className }: LeaderboardCardProps) => {
    return element.path ? (
        <AppLink
            to={`${element.path}${element.id}`}
            className={classNames(
                cls.LeaderboardCard,
                {},
                [className].filter((elem) => {
                    return elem !== undefined;
                }),
            )}
        >
            <div className={cls.Position}>{position}</div>
            <div className={cls.LastMatch}>^</div>
            <div className={cls.ClanLogo}>
                <Image
                    src={clanLogo}
                    alt="a heart shaped clan logo"
                />
            </div>
            <div className={cls.Name}>{element.name}</div>
            <div className={cls.Points}>{element.points}p</div>
        </AppLink>
    ) : (
        <div
            className={classNames(
                cls.LeaderboardCard,
                {},
                [className].filter((elem) => {
                    return elem !== undefined;
                }),
            )}
        >
            <div className={cls.Position}>{position}</div>
            <div className={cls.LastMatch}>^</div>
            <div className={cls.ClanLogo}>
                <Image
                    src={clanLogo}
                    alt="a heart shaped clan logo"
                />
            </div>
            <div className={cls.Name}>{element.name}</div>
            <div className={cls.Points}>{element.points}p</div>
        </div>
    );
});
LeaderboardCard.displayName = 'Leaderboard-card';
export default LeaderboardCard;
