import { memo } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import leaderboardWin from '@/shared/assets/icons/LeaderboardLWin.svg';
import leaderboardLose from '@/shared/assets/icons/LeaderboardLose.svg';
import leaderboardDraw from '@/shared/assets/icons/LeaderboardDraw.svg';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './LeaderboardCard.module.scss';

interface LeaderboardCardProps {
    element: LeaderboardItem;
    position: number;
    path?: string;
    className?: string;
}

const LeaderboardCard = memo(({ element, path, position, className }: LeaderboardCardProps) => {
    return path ? (
        <AppLink
            to={`${path}/${element.id}`}
            className={classNames(
                cls.LeaderboardCard,
                {},
                [cls.ScaleOnHover, className].filter((elem) => {
                    return elem !== undefined;
                }),
            )}
        >
            <div className={cls.Position}>{position}</div>
            <div className={cls.LastMatch}>
                {position % 3 === 0 ? (
                    <Image
                        src={leaderboardDraw}
                        alt="orange dash"
                        className={cls.Dash}
                    />
                ) : position % 2 ? (
                    <Image
                        src={leaderboardWin}
                        alt="green chevron pointing up"
                        className={cls.ChevronUp}
                    />
                ) : (
                    <Image
                        src={leaderboardLose}
                        alt="red chevron pointing down"
                        className={cls.ChevronDown}
                    />
                )}
            </div>
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
            <div className={cls.LastMatch}>
                {position % 3 === 0 ? (
                    <Image
                        src={leaderboardDraw}
                        alt="orange dash"
                        className={cls.Dash}
                    />
                ) : position % 2 ? (
                    <Image
                        src={leaderboardWin}
                        alt="green chevron pointing up"
                        className={cls.ChevronUp}
                    />
                ) : (
                    <Image
                        src={leaderboardLose}
                        alt="red chevron pointing down"
                        className={cls.ChevronDown}
                    />
                )}
            </div>
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
