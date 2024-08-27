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
import { useClientTranslation } from "@/shared/i18n";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import { ClansViewAndSearchDesktop, ClansViewAndSearchMobile } from "../_components/clanoverview/clanViewAndSearch";

type Props = {
    title: string;
    profileDeletionText: string;
    profileDeletionInfoText: string;
}

const ClanRoomSubPage = ({ title, profileDeletionText, profileDeletionInfoText }: Props) => {

    const { id, lng } = useParams();
    const user = useSelector(selectProfile);
    const { t } = useClientTranslation(lng as string, "clan");
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
                {toast.error(t('toast_error'))}
            </>
        );
    }

    if (clan) {
        return (<>
            {isMobileSize && <ClansViewAndSearchMobile />}
            <div className={cls.parent}>
                <div className={cls.div2}>
                    <Image
                        src={clanLogo}
                        alt={"clan logo"}
                        className={cls.clanLogo} />
                    <span className={cls.clanName}>{clan?.data?.Clan?.name}</span>
                    <a className={cls.number} href="/leaderboardjne">♛12</a>
                </div>
                <div className={cls.div3}>
                    {!isMobileSize && <ClansViewAndSearchDesktop />}
                </div>
                <div className={cls.div4}>
                    <Image
                        src={clanHome}
                        alt={"clan home"}
                        className={cls.clanHome} />
                </div>
                <div className={cls.div5}>
                    {!isLoggedIn ? (
                        <Button
                            className={cls.JoinClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => toast.error(t("toast_notloggedin"))} >
                            {t("join_clan_btn")}
                        </Button>
                    ) : isLoggedIn && !isOpen ? (<>
                        <Button
                            className={cls.JoinClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => toast.error('Clan is not open')} >
                            {t("join_clan_btn")}
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
                            {t("join_clan_btn")}
                        </Button>
                    ) : (
                        <Button
                            className={cls.DeleteClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => handleLeave()} >
                            {t("leave_clan_btn")}
                        </Button>
                    )
                    }
                    {isAdmin && (
                        <Button
                            className={cls.EditClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.L}
                            onClick={() => toast.success('Editing mode')} >
                            {t("edit_clan_btn")}
                        </Button>
                    )
                    }
                </div>
                <div className={cls.div6}>{t("member_list")}
                    <div className={cls.membersList}>
                        {players.map(player => (
                            <div key={player._id} className={adminIds.includes(player._id) ? cls.adminItem : cls.memberItem}>
                                {player.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cls.div7}>
                    {t("motto")}
                    <p className={cls.mottoText}>Unite, Conquer, Prevail!</p>
                </div>
                <div className={cls.div8}>{t("info")}
                    < div className={cls.clanInfo} >
                        <p className={cls.infoItem}>{t("assets")}: {clan?.data?.Clan?.gameCoins}</p>
                        <p className={cls.infoItem}>{t("members_count")}: {players.length}/10</p>
                        <p className={cls.infoItem}>{t("language")}: {clan?.data?.Clan?.name}</p>
                        <p className={cls.infoItem}>{t("goal")}: {clan?.data?.Clan?.name}</p>
                        <p className={cls.infoItem}>{t("age_limit")}: {clan?.data?.Clan?.name}</p>
                        <p className={cls.infoItem}>{t("wins")}: {clan?.data?.Clan?.name}</p>
                        <p className={cls.infoItem}>{t("losses")}: {clan?.data?.Clan?.name}</p>
                    </div>
                </div>
            </div>
        </>
        )
    }
}

export default ClanRoomSubPage;
