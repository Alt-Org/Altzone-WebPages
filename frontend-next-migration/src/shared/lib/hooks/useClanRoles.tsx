import { selectProfile } from "@/entities/Auth";
import { useSelector } from "react-redux";

export const useClanRoles = (adminIds: string[], players: any[]) => {
    const user = useSelector(selectProfile);
    const playerId: string | undefined = user?.Player?._id;

    const isAdmin = playerId ? adminIds.includes(playerId) : false;
    const isInClan = playerId ? players.some(player => player._id === playerId) : false;


    return { isAdmin, isInClan, playerId };
};
