"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useSelector } from "react-redux";
import { useGetClanByIdWithPlayersQuery } from "@/entities/Clan";
import { Loader } from "@/shared/ui/Loader";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { useJoinClan } from "@/features/JoinClan";
import { useLeaveClan } from "@/features/LeaveClan";
import { selectProfile } from "@/entities/Auth";
import clanLogo from "@/shared/assets/images/clanLogos/temp-clanlogo.png";
import clanHome from "@/shared/assets/images/clanLogos/temp-clanHome.png";
import lock from "@/shared/assets/images/clanLogos/lock.png";
import cls from "./ClanRoomSubPage.module.scss";
import { toast } from "react-toastify";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import { ClansViewAndSearchDesktop, ClansViewAndSearchMobile } from "../_components/clanoverview/clanViewAndSearch";
import { ClanInfo } from "../_components/clanoverview/clanInfo";

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
        toastMessages: {
            error: toastError,
            notLoggedIn: toastNotLoggedIn,
            clanNotOpen: toastClanNotOpen,
            editMode: toastEditMode,
        },
        buttons: {
            joinClan: joinClanBtn,
            leaveClan: leaveClanBtn,
            editClan: editClanBtn,
        },
        clanInfo: {
            memberListTitle,
            mottoText,
            infoText,
            ...rest
        }
    } = props;

    const { id, lng } = useParams();
    const user = useSelector(selectProfile);
    const { isMobileSize } = useIsMobileSize();

    const playerId: string | undefined = user?.Player?._id;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isInClan, setIsInClan] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { data: clan, error, isLoading } = useGetClanByIdWithPlayersQuery(id as string);
    const adminIds = clan?.data?.Clan?.admin_ids || [];
    const players = clan?.data.Clan.Player || [];

    useEffect(() => {
        if (clan?.data.Clan.isOpen) {
            setIsOpen(true)
        }
        if (playerId) {
            setLoggedIn(true);

            if (clan?.data?.Clan?.admin_ids.includes(playerId)) {
                setIsAdmin(true);
            }

            if (clan?.data.Clan.Player.some(player => player._id === playerId)) {
                setIsInClan(true);
            }
        } else {
            setLoggedIn(false);
            setIsInClan(false);
        }
    }, [isLoading, clan?.data?.Clan?.admin_ids, playerId, clan?.data.Clan.Player, clan?.data.Clan.isOpen]);

    const { handleJoin } = useJoinClan();
    const { handleLeave } = useLeaveClan();

    if (isLoading) return <Loader className={cls.Loader} />

    if (error) {
        return (
            <>
                {toast.error(toastError)}
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
                    <span className={cls.clanName}>{clan?.data?.Clan?.name}</span>
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
                    {!isLoggedIn ? (
                        <Button
                            className={cls.JoinClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => toast.error(toastNotLoggedIn)} >
                            {joinClanBtn}
                        </Button>
                    ) : isLoggedIn && !isOpen ? (<>
                        <Button
                            className={cls.JoinClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => toast.error(toastClanNotOpen)} >
                            {joinClanBtn}
                        </Button>
                        <Image
                            src={lock}
                            alt={"clan logo"}
                            className={cls.lock} /></>
                    ) : isLoggedIn && !isInClan ? (
                        <Button
                            className={cls.JoinClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => handleJoin(clan?.data?.Clan?._id, playerId ?? "", "join")} >
                            {joinClanBtn}
                        </Button>
                    ) : (
                        <Button
                            className={cls.DeleteClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => handleLeave()} >
                            {leaveClanBtn}
                        </Button>
                    )
                    }
                    {isAdmin && (
                        <Button
                            className={cls.EditClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => toast.success(toastEditMode)} >
                            {editClanBtn}
                        </Button>
                    )
                    }
                </div>
                <div className={cls.memberList}>{memberListTitle}
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
