"use client"
import Image from "next/image";
import { useParams } from 'next/navigation';
import { Loader } from "@/shared/ui/Loader";
import clanLogo from "@/shared/assets/images/clanLogos/temp-clanlogo.png";
import clanHome from "@/shared/assets/images/clanLogos/temp-clanHome.png";
import cls from "./ClanRoomSubPage.module.scss";
import { toast } from "react-toastify";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import { ClansViewAndSearchDesktop, ClansViewAndSearchMobile } from "../_components/clanoverview/clanViewAndSearch";
import { ClanInfo } from "../_components/clanoverview/clanInfo";
import { ButtonField } from "../_components/clanoverview/buttonField";
import { useClanData } from "@/shared/lib/hooks/useClanData";

type Props = {
    toastMessages: {
        error: string;
        notLoggedIn: string;
        clanNotOpen: string;
        editMode: string;
    };
    buttons: {
        joinClan: string;
        leaveClan: string;
        editClan: string;
    };
    clanInfo: {
        memberListTitle: string;
        mottoText: string;
        infoText: string;
        assetsText: string;
        memberCountText: string;
        languageText: string;
        goalText: string;
        ageLimitText: string;
        winsText: string;
        lossesText: string;
    };
};

const ClanRoomSubPage = (props: Props) => {
    const {
        toastMessages,
        buttons,
        clanInfo: {
            memberListTitle,
            mottoText,
            infoText,
            ...rest
        }
    } = props;

    const { id } = useParams();
    const { isMobileSize } = useIsMobileSize();
    const { clan, error, isLoading, adminIds, players, clanName } = useClanData(id as string);

    if (isLoading) return <Loader className={cls.Loader} />

    //proper error handling page should be implemented
    if (error) {
        return (
            <>
                {toast.error("error placeholder")}
            </>
        );
    }

    if (clan) {
        return (<>
            {isMobileSize && <ClansViewAndSearchMobile />}
            <div className={cls.parent}>
                <div className={cls.clanMainInfo}>
                    <Image
                        src={clanLogo}
                        alt={"clan logo"}
                        className={cls.clanLogo} />
                    <span className={cls.clanName}>{clanName}</span>
                    <a className={cls.number} href="/leaderboardjne">♛12</a>
                </div>
                <div className={cls.clanList}>
                    {!isMobileSize && <ClansViewAndSearchDesktop />}
                </div>
                <div className={cls.clanSoulHome}>
                    <Image
                        src={clanHome}
                        alt={"clan home"}
                        className={cls.clanHome} />
                </div>
                <div className={cls.buttonField}>
                    <ButtonField
                        clanData={clan?.data?.Clan}
                        {...toastMessages}
                        {...buttons}
                    />
                </div>
                <div className={cls.memberList}>{memberListTitle}
                    {/* this could be its own component */}
                    <div className={cls.membersList}>
                        {players.map(player => (
                            <div key={player._id} className={adminIds.includes(player._id) ? cls.adminItem : cls.memberItem}>
                                {player.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cls.clanMotto}>
                    {mottoText}
                    {/* Clan Motto and most of ClanInfo yet to be implemented, using placeholders instead*/}
                    <p className={cls.mottoText}>Unite, Conquer, Prevail!</p>
                </div>
                <div className={cls.clanInformation}>{infoText}
                    <ClanInfo
                        clanData={clan?.data?.Clan}
                        {...rest}
                    />
                </div>
            </div>
        </>
        )
    }
}

export default ClanRoomSubPage;