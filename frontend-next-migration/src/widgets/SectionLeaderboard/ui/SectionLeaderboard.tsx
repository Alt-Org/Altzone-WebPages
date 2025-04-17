'use client';
import { useState } from 'react';
import { Leaderboard, LeaderboardTitle } from '@/entities/Leaderboard';
import { LeaderboardItem } from '@/entities/Leaderboard/types/leaderboard';
import useSizes from '@/shared/lib/hooks/useSizes';
import { CustomSwitch, CustomSwitchItems } from '@/shared/ui/CustomSwitch';
import { LeaderboardType } from '../types';
import cls from './SectionLeaderboard.module.scss';

interface SectionLeaderboardProps {
    leaderboards: LeaderboardType[];
    className?: string;
}

const SectionLeaderboard = ({ leaderboards, className }: SectionLeaderboardProps) => {
    // return
    const [customSwitchOption, setCustomSwitchOption] = useState(0);
    const { isMobileSize, isTabletSize, isDesktopSize, isWidescreenSize } = useSizes();
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
            {leaderboards.length + 1 >= customSwitchOption ? (
                <div className={cls.LeaderboardContainer}>
                    <Leaderboard leaders={leaderboards[customSwitchOption].leaders} />
                </div>
            ) : null}
        </div>
    ) : (
        <div className={cls.Leaderboards}>
            {leaderboards.map((leaderboard, index) => (
                <div
                    key={index}
                    className={cls.LeaderboardContainer}
                >
                    <LeaderboardTitle
                        title={leaderboard.title}
                        className={cls.LeaderboardTitle}
                    />
                    <Leaderboard leaders={leaderboard.leaders} />
                </div>
            ))}
        </div>
    );
};

export default SectionLeaderboard;
