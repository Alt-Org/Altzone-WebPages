"use client"
import React, { useEffect, useState } from "react";
import Head from "next/head";
import {useRouter, useParams} from 'next/navigation';
import { useSelector } from "react-redux";
import { useGetClanByIdQuery } from "@/entities/Clan";
import { Loader } from "@/shared/ui/Loader";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { useDeleteClan } from "@/features/DeleteClan";
import { selectProfile } from "@/entities/Auth";

import cls from "./ClanRoomSubPage.module.scss";
import {envHelper} from "@/shared/const/env/envHelper";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

const ClanRoomSubPage = () => {
    // @ts-ignore
    const {id} = useParams();

    // let { id } = useParams();
    const user = useSelector(selectProfile);
    const playerId = user?.Player._id;
    const [canDelete, setCanDelete] = useState(false);

    const { data: clan, error, isLoading } = useGetClanByIdQuery(id as string);

    useEffect(() => {
        if (!playerId) return;

        if (clan?.data.Clan.admin_ids.includes(playerId)) {
            setCanDelete(true);
        }
    }, [isLoading,clan?.data.Clan.admin_ids, playerId]);

    const { handleDelete } = useDeleteClan();

    return (
        <>
            <Head>
                <title>{`Klaani: ${clan?.data?.Clan?.name}`}</title>
                <meta name="description" content={`Tietoja klaanista ${clan?.data?.Clan?.name}`} />
                <meta name="keywords" content="altzone , Klaani, klaan, game, clan, gaming community" />
                <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.clan}/${id}`} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`Klaani: ${clan?.data?.Clan?.name}`} />
                <meta property="og:description" content={`Tietoja klaanista ${clan?.data?.Clan?.name}`} />
                <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.clan}/${id}`} />
            </Head>
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
                    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>KLAANI: {clan?.data?.Clan?.name}</h1>
                    <div><strong>Kolikot:</strong> {clan?.data?.Clan?.gameCoins}</div>
                    <div><strong>Tagi:</strong> {clan?.data?.Clan?.tag}</div>
                    <div><strong>Jäsenet:</strong> {clan?.data?.Clan?.playerCount}</div>
                    <div><strong>Huonekalut:</strong> {clan?.data?.Clan?.furnitureCount}</div>
                    <div><strong>RaidHuoneet:</strong> {clan?.data?.Clan?.raidRoomCount}</div>
                    <div><strong>Mestari:</strong> Joku Mestari</div>
                    {
                        canDelete &&
                        <Button
                            className={cls.DeleteClanBtn}
                            theme={ButtonTheme.Graffiti}
                            size={ButtonSize.M}
                            onClick={() => handleDelete(id as string)} >
                            Delete clan
                        </Button>
                    }
                </>
            )}
        </>
    )
}

export default ClanRoomSubPage;
