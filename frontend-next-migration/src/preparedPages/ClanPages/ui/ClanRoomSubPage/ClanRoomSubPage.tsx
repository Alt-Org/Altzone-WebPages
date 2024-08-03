"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useParams } from 'next/navigation';
import { useSelector } from "react-redux";
import { useGetClanByIdWithPlayersQuery } from "@/entities/Clan";
import { Loader } from "@/shared/ui/Loader";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { useDeleteClan } from "@/features/DeleteClan";
import { selectProfile } from "@/entities/Auth";
import clanLogo from "@/shared/assets/images/clanLogos/temp-clanlogo.png";
import clanHome from "@/shared/assets/images/clanLogos/temp-clanHome.png";
import cls from "./ClanRoomSubPage.module.scss";
import { envHelper } from "@/shared/const/envHelper";
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import { toast } from "react-toastify";
import { useClientTranslation } from "@/shared/i18n";

const ClanRoomSubPage = () => {
    // @ts-ignore
    const { id, lng } = useParams();
    const user = useSelector(selectProfile);
    const lng2 = lng as string;
    const { t } = useClientTranslation(lng2, "clan");

    const playerId = user?.Player._id;
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isInClan, setIsInClan] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { data: clan, error, isLoading } = useGetClanByIdWithPlayersQuery(id as string);
    const players = clan?.data.Clan.Player || [];

    useEffect(() => {
        if (clan?.data.Clan.isOpen) {
            setIsOpen(true)
        }
        if (playerId) {
            setLoggedIn(true);

            if (clan?.data.Clan.admin_ids.includes(playerId)) {
                setIsAdmin(true);
            }

            if (clan?.data.Clan.Player.some(player => player._id === playerId)) {
                setIsInClan(true);
            }
        } else {
            setLoggedIn(false);
            setIsInClan(false);
        }
    }, [isLoading, clan?.data.Clan.admin_ids, playerId, clan?.data.Clan.Player, clan?.data.Clan.isOpen]);

    const { handleDelete } = useDeleteClan();

    return (
        <>
            {
                isLoading ? (
                    <Loader className={cls.Loader} />
                )
                    :
                    error
                        ?
                        (
                            <div>Error: {JSON.stringify(error)}</div>
                        )
                        :
                        (
                            <>

                                <div className={cls.parent}>
                                    <div className={cls.div1}>
                                        <Image
                                            src={clanLogo}
                                            alt={"clan logo"}
                                            className={cls.clanLogo} />
                                    </div>
                                    <div className={cls.div2}>
                                        <span className={cls.clanName}>{clan?.data?.Clan?.name}</span>
                                        <a className={cls.number} href="/leaderboardjne">♛12</a>
                                    </div>
                                    <div className={cls.div3}>{t("clan_list")}
                                    </div>
                                    <div className={cls.div4}>
                                        <Image
                                            src={clanLogo}
                                            alt={"clan logo"}
                                            className={cls.clanLogo} />
                                        (sielunkoti kuva)
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
                                        ) : isLoggedIn && !isInClan ? (
                                            <Button
                                                className={cls.JoinClanBtn}
                                                theme={ButtonTheme.Graffiti}
                                                size={ButtonSize.L}
                                                onClick={() => toast.success(t("toast_join_success"))} >
                                                {t("join_clan_btn")}
                                            </Button>
                                        ) : isLoggedIn && !isInClan && !isOpen ? (
                                            <Button
                                                className={cls.JoinClanBtn}
                                                theme={ButtonTheme.Graffiti}
                                                size={ButtonSize.L}
                                                onClick={() => toast.error('Clan is not open')} >
                                                {t("join_clan_btn")}
                                            </Button>
                                        ) : (
                                            <Button
                                                className={cls.DeleteClanBtn}
                                                theme={ButtonTheme.Graffiti}
                                                size={ButtonSize.L}
                                                onClick={() => toast.success('You left the Clan')} >
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
                                                <div key={player._id} className={cls.memberItem}>
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
        </>
    )
}

export default ClanRoomSubPage;
