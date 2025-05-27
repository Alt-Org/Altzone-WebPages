import { memo } from 'react';
import cls from './LeaderboardTitle.module.scss';

interface LeaderboardTitleProps {
    title: string;
    className?: string;
}

const LeaderboardTitle = memo(({ title, className }: LeaderboardTitleProps) => {
    return (
        <div className={`${cls.LeaderboardTitle}${className ? ` ${className}` : ''}`}>
            <p>{title}</p>
        </div>
    );
});

LeaderboardTitle.displayName = 'Leaderboard-title';

export default LeaderboardTitle;
