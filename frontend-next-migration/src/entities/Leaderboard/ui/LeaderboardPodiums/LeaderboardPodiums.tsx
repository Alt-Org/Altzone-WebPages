import { memo } from 'react';
import Image from 'next/image';
import medal1 from '@/shared/assets/icons/medal-nro1-40px.svg';
import medal2 from '@/shared/assets/icons/medal-nro2-40px.svg';
import medal3 from '@/shared/assets/icons/medal-nro3-40px.svg';
import clanLogo from '@/shared/assets/images/clanLogos/temp-clanlogo.png';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LeaderboardItem } from '../../types/leaderboard';
import cls from './LeaderboardPodiums.module.scss';

interface PodiumProps {
    leaders: LeaderboardItem[];
    className?: string;
}

const LeaderboardPodium = memo(({ leaders, className }: PodiumProps) => {
    return (
        <div
            className={classNames(
                cls.Podiums,
                {},
                [className].filter((name) => name !== undefined),
            )}
        >
            <div className={cls.PodiumContainer}>
                <div className={cls.ClanIcon}>
                    <Image
                        src={clanLogo}
                        alt="a heart shaped clan logo"
                    />
                </div>
                <div className={`${cls.Podium} ${cls.PodiumSilver}`}>
                    <div className={cls.Medal}>
                        <Image
                            src={medal2}
                            alt="a silver medal with the number 2 on it"
                        />
                    </div>
                    <div className={cls.Leader}>
                        {leaders[1] ? (
                            <>
                                <p>{leaders[1].name}</p>
                                <p>{leaders[1].points}p</p>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={cls.PodiumContainer}>
                <div className={cls.ClanIcon}>
                    <Image
                        src={clanLogo}
                        alt="a heart shaped clan logo"
                    />
                </div>
                <div className={`${cls.Podium} ${cls.PodiumGold}`}>
                    <div className={cls.Medal}>
                        <Image
                            src={medal1}
                            alt="a golden medal with the number 1 on it"
                        />
                    </div>
                    <div className={cls.Leader}>
                        {leaders[0] ? (
                            <>
                                <p>{leaders[0].name}</p>
                                <p>{leaders[0].points}p</p>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className={cls.PodiumContainer}>
                <div className={cls.ClanIcon}>
                    <Image
                        src={clanLogo}
                        alt="a heart shaped clan logo"
                    />
                </div>
                <div className={`${cls.Podium} ${cls.PodiumBronze}`}>
                    <div className={cls.Medal}>
                        <Image
                            src={medal3}
                            alt="a bronze medal with the number 3 on it"
                        />
                    </div>
                    <div className={cls.Leader}>
                        {leaders[2] ? (
                            <>
                                <p>{leaders[2].name}</p>
                                <p>{leaders[2].points}p</p>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
});

LeaderboardPodium.displayName = 'leaderboard-podium';

export default LeaderboardPodium;
