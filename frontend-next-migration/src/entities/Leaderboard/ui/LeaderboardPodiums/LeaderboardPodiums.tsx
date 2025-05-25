import { memo } from 'react';
import Image from 'next/image';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import medal1 from '@/shared/assets/icons/medal-nro1-40px.svg';
import medal2 from '@/shared/assets/icons/medal-nro2-40px.svg';
import medal3 from '@/shared/assets/icons/medal-nro3-40px.svg';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './LeaderboardPodiums.module.scss';

interface PodiumProps {
    leaders: LeaderboardItem[];
    path?: string;
    className?: string;
}

const MEDALS = [medal1, medal2, medal3];

const LeaderboardPodium = memo(({ leaders, path, className }: PodiumProps) => {
    return (
        <div className={cls.PodiumsContainer}>
            <div
                className={classNames(
                    cls.Podiums,
                    {},
                    [className].filter((name) => name !== undefined),
                )}
            >
                {MEDALS.map((medal, index) =>
                    path ? (
                        <AppLink
                            key={index}
                            to={`${path}/${leaders[index] ? leaders[index].id : ''}`}
                            className={`${cls.PodiumContainer} ${cls[`PodiumContainer${index}`]}`}
                        >
                            <div className={cls.ClanIcon}>
                                <Image
                                    src={clanLogo}
                                    alt="a heart shaped clan logo"
                                />
                            </div>
                            <div className={cls.Podium}>
                                <div className={cls.Medal}>
                                    <Image
                                        src={medal}
                                        alt={`a medal with the number ${index + 1} on it`}
                                    />
                                </div>
                                <div className={cls.Leader}>
                                    {leaders[index] ? (
                                        <>
                                            <p>{leaders[index].name}</p>
                                            <p>{leaders[index].points}p</p>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </AppLink>
                    ) : (
                        <div
                            key={index}
                            className={`${cls.PodiumContainer} ${cls[`PodiumContainer${index}`]}`}
                        >
                            <div className={cls.ClanIcon}>
                                <Image
                                    src={clanLogo}
                                    alt="a heart shaped clan logo"
                                />
                            </div>
                            <div className={cls.Podium}>
                                <div className={cls.Medal}>
                                    <Image
                                        src={medal}
                                        alt={`a medal with the number ${index + 1} on it`}
                                    />
                                </div>
                                <div className={cls.Leader}>
                                    {leaders[index] ? (
                                        <>
                                            <p>{leaders[index].name}</p>
                                            <p>{leaders[index].points}p</p>
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    ),
                )}
            </div>
        </div>
    );
});

LeaderboardPodium.displayName = 'leaderboard-podium';

export default LeaderboardPodium;
