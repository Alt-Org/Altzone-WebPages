import { useGetClanByIdWithPlayersQuery } from "../../Clan";

export const useClanData = (clanId: string) => {
    const { data: clan, error, isLoading } = useGetClanByIdWithPlayersQuery(clanId);

    return {
        clan,
        error,
        isLoading,
        adminIds: clan?.data?.Clan?.admin_ids || [],
        players: clan?.data?.Clan?.Player || [],
        clanName: clan?.data?.Clan?.name,
    };
};
