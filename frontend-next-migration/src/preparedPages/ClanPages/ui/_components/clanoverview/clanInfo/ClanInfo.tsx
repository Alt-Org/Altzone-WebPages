import cls from "./ClanInfo.module.scss";

type Props = {
    clanGameCoins: number;
    assetsText: string;
    memberCountText: string;
    languageText: string;
    goalText: string;
    ageLimitText: string;
    winsText: string;
    lossesText: string;
    playersInClan: number;
    clanLanguage: string;
    clanGoal: string;
    clanAgeLimit: string;
    clanWins: string;
    clanLosses: string;
}

const ClanInfo = (props: Props) => {
    const {
        assetsText,
        memberCountText,
        languageText,
        goalText,
        ageLimitText,
        winsText,
        lossesText,
        clanGameCoins,
        playersInClan,
        clanLanguage,
        clanGoal,
        clanAgeLimit,
        clanWins,
        clanLosses
    } = props;

    return (
        <div className={cls.clanInfo}>
            <p className={cls.infoItem}>{assetsText}: {clanGameCoins}</p>
            <p className={cls.infoItem}>{memberCountText}: {playersInClan}/10</p>
            <p className={cls.infoItem}>{languageText}: {clanLanguage}</p>
            <p className={cls.infoItem}>{goalText}: {clanGoal}</p>
            <p className={cls.infoItem}>{ageLimitText}: {clanAgeLimit}</p>
            <p className={cls.infoItem}>{winsText}: {clanWins}</p>
            <p className={cls.infoItem}>{lossesText}: {clanLosses}</p>
        </div>
    );
};

export default ClanInfo;
