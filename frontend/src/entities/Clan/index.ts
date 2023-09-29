export {
    useCreateClanMutation,
    useDeleteClanMutation,
    useUpdateClanMutation,
    clanApi,
    useGetClanByIdQuery,
    useGetClansQuery,
    clanEndpoints
} from "./model/clanApi";

export type {IClan,IClanCreateDto,IClanUpdateDto} from "./types/clan";