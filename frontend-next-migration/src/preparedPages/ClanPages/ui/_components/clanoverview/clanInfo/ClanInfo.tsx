import cls from './ClanInfo.module.scss';

type Props = {
    clanData: {
        playerCount?: number;
        language?: string;
        goal?: string;
        ageLimit?: number;
        wins?: number;
        losses?: number;
    };
    assetsText: string;
    memberCountText: string;
    languageText: string;
    goalText: string;
    ageLimitText: string;
    winsText: string;
    lossesText: string;
};

const ClanInfo = ({
    clanData,
    memberCountText,
    languageText,
    goalText,
    ageLimitText,
    winsText,
    lossesText,
}: Props) => {
    if (!clanData) return <p className={cls.error}>Clan data is missing</p>;

    return (
        <div className={cls.clanInfo}>
            <p className={cls.infoItem}>
                {memberCountText}: {clanData.playerCount ?? 'N/A'}/10
            </p>
            <p className={cls.infoItem}>
                {languageText}: {clanData.language ?? 'Unknown'}
            </p>
            <p className={cls.infoItem}>
                {goalText}: {clanData.goal ?? 'Not specified'}
            </p>
            <p className={cls.infoItem}>
                {ageLimitText}: {clanData.ageLimit ?? 'No limit'}
            </p>
            <p className={cls.infoItem}>
                {winsText}: {clanData.wins ?? 0}
            </p>
            <p className={cls.infoItem}>
                {lossesText}: {clanData.losses ?? 0}
            </p>
        </div>
    );
};

export default ClanInfo;
