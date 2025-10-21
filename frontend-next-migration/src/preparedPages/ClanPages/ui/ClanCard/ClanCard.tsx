import { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import cls from './ClanCard.module.scss';
import iconLeaderboard from '@/shared/assets/images/clanLogos/LeaderboardWinFirstPlace.png';
import iconFlagFi from '@/shared/assets/images/clanLogos/CommonFlagFinland 1.png';

type Label = { text: string; icon: string | StaticImageData };

interface ClanCardProps {
    name: string;
    members: number;
    capacity: number;
    coins?: number;
    logo: string | StaticImageData;
    labels?: Label[];
    onClick?: () => void;
    className?: string;
}

export const ClanCard: FC<ClanCardProps> = ({
    name,
    members,
    capacity,
    coins,
    logo,
    labels = [],
    onClick,
    className,
}) => (
    <ModularCard
        theme={ModularCardTheme.CLAN}
        className={`${cls.ClanCard} ${className ?? ''}`}
        onClick={onClick}
        tabIndex={0}
        role="button"
    >
        <div className={cls.grid}>
            <div className={cls.left}>
                <div className={cls.title}>{name}</div>
                <div className={cls.meta}>
                    <span className={cls.metaGroup}>
                        <Image
                            src={iconLeaderboard}
                            alt="leader"
                            width={18}
                            height={18}
                        />
                        <Image
                            src={iconFlagFi}
                            alt="flag"
                            width={18}
                            height={18}
                        />
                        <span className={cls.metaLabel}>Members</span> {members} / {capacity}
                    </span>
                    {coins !== undefined && <span>{coins}</span>}
                </div>
                {labels.length > 0 && (
                    <div className={cls.labels}>
                        {labels.map((label, idx) => (
                            <span
                                className={cls.label}
                                key={idx}
                            >
                                <Image
                                    src={label.icon}
                                    alt={label.text}
                                    width={18}
                                    height={18}
                                />
                                {label.text}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className={cls.logo}>
                <ModularCard.Image>
                    <ModularCard.Image.Image
                        src={logo}
                        alt={`${name} logo`}
                    />
                </ModularCard.Image>
            </div>
        </div>
    </ModularCard>
);
