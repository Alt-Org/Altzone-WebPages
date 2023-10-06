import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";

import {useGetClanByIdQuery} from "@/entities/Clan";
import {Loader} from "@/shared/ui/Loader";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import {useDeleteClan} from "@/features/DeleteClan";
import {selectProfile} from "@/entities/Auth";

import cls from "./ClanRoomSubPage.module.scss";


const ClanRoomSubPage = () => {
    let { id } = useParams();
    const user = useSelector(selectProfile);
    const playerId = user?.Player._id;
    const [canDelete, setCanDelete] = useState(false);

    const { data: clan, error, isLoading } = useGetClanByIdQuery(id as string);

    useEffect(()=>{
        if(!playerId) return;

        if(clan?.data.Clan.admin_ids.includes(playerId)){
            console.log("yes");
            setCanDelete(true)
        }
    },[isLoading])

    const {handleDelete} = useDeleteClan();

    if (isLoading) return <Loader className={cls.Loader}/>

    if (error) return <div>Error: {JSON.stringify(error)}</div>;

    return (
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
                    onClick={()=> handleDelete(id as string)} >
                    Delete clan
                </Button>
            }
        </>
    )
}


export default ClanRoomSubPage;