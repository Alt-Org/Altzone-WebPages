'use client';
import { useState } from 'react';
import { Leaderboard, LeaderboardTitle } from '@/entities/Leaderboard';
import useSizes from '@/shared/lib/hooks/useSizes';
import { CustomSwitch, CustomSwitchItems } from '@/shared/ui/CustomSwitch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { LeaderboardType } from '../types';
import cls from './SectionLeaderboard.module.scss';

interface SectionLeaderboardProps {
    leaderboard1?: LeaderboardType;
    leaderboard2?: LeaderboardType;
    className?: string;
}

const SectionLeaderboard = ({ leaderboard1, leaderboard2, className }: SectionLeaderboardProps) => {
    const [customSwitchOption, setCustomSwitchOption] = useState(0);
    const { isMobileSize, isTabletSize } = useSizes();
    const leaderboards = [leaderboard1, leaderboard2].filter((element) => element !== undefined);
    return isMobileSize || isTabletSize ? (
        <div>
            <CustomSwitch
                className={cls.LeaderboardSwitch}
                elements={leaderboards
                    .map((leaderboard) => {
                        return { children: <p>{leaderboard.title}</p> };
                    })
                    .map((elem, index) => {
                        return {
                            type: CustomSwitchItems.ToggleItem as CustomSwitchItems.ToggleItem,
                            isOpen: customSwitchOption === index,
                            onOpen: () => {
                                if (customSwitchOption !== index) {
                                    setCustomSwitchOption(index);
                                }
                            },
                            ...elem,
                        };
                    })}
            />
            {leaderboards.length - 1 >= customSwitchOption ? (
                <div className={cls.LeaderboardContainer}>
                    <Leaderboard leaders={leaderboards[customSwitchOption].leaders} />
                </div>
            ) : null}
        </div>
    ) : (
        <div
            className={classNames(
                cls.Leaderboards,
                {},
                [className].filter((element) => element !== undefined),
            )}
        >
            {leaderboard1 && (
                <div className={cls.LeaderboardContainer}>
                    <LeaderboardTitle
                        title={leaderboard1.title}
                        className={cls.LeaderboardTitle}
                    />
                    <Leaderboard leaders={leaderboard1.leaders} />
                </div>
            )}
            {leaderboard2 && (
                <div className={cls.LeaderboardContainer}>
                    <LeaderboardTitle
                        title={leaderboard2.title}
                        className={cls.LeaderboardTitle}
                    />
                    <Leaderboard leaders={leaderboard2.leaders} />
                </div>
            )}
        </div>
    );
};

export default SectionLeaderboard;
