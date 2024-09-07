import cls from "./ClanInfo.module.scss";

type Props = {
    clanData: any;
    assetsText: string;
    memberCountText: string;
    languageText: string;
    goalText: string;
    ageLimitText: string;
    winsText: string;
    lossesText: string;
}

const ClanInfo = (props: Props) => {
    const {
        clanData,
        assetsText,
        memberCountText,
        languageText,
        goalText,
        ageLimitText,
        winsText,
        lossesText
    } = props;

    return (
        <div className={cls.clanInfo}>
            <p className={cls.infoItem}>{assetsText}: {clanData.gameCoins}</p>
            <p className={cls.infoItem}>{memberCountText}: {clanData.playerCount}/10</p>
            <p className={cls.infoItem}>{languageText}: {clanData.name}</p>
            <p className={cls.infoItem}>{goalText}: {clanData.name}</p>
            <p className={cls.infoItem}>{ageLimitText}: {clanData.name}</p>
            <p className={cls.infoItem}>{winsText}: {clanData.name}</p>
            <p className={cls.infoItem}>{lossesText}: {clanData.name}</p>
        </div>
    );
};

export default ClanInfo;
