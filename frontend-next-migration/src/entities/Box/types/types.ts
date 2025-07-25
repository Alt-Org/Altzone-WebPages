import { IClan } from '@/entities/Clan';

type MetaData = {
    dataKey: string;
    modelName: string;
    dataType: 'Array' | 'Object';
    dataCount: number;
};

type DailyTask = {
    clan_id: string;
    player_id: string | null;
    title: Record<string, unknown>;
    type: Record<string, unknown>;
    startedAt: string; // ISO date string
    points: number;
    coins: number;
    amount: number;
    amountLeft: number;
    timeLimitMinutes: number;
    _id: string | Record<string, unknown>;
};

type Box = {
    _id: string;
    adminPassword: string;
    sessionStage: 'Preparing' | 'Testing' | 'End' | string;
    testersSharedPassword: string | null;
    boxRemovalTime: number; // Unix timestamp (ms)
    sessionResetTime: number; // Unix timestamp (ms)
    adminProfile_id: string;
    adminPlayer_id: string;
    // clan_ids: string[];
    // soulHome_ids: string[];
    // room_ids: string[];
    // stock_ids: string[];
    accountClaimersIds: string[];
    // dailyTasks: DailyTask[];
};

type Avatar = {
    head: number;
    hair: number;
    eyes: number;
    nose: number;
    mouth: number;
    eyebrows: number;
    clothes: number;
    feet: number;
    hands: number;
    skinColor: string;
};

type Message = {
    date: string;
    count: number;
};

type GameStatistics = {
    playedBattles: number;
    wonBattles: number;
    diamondsAmount: number;
    startedVotings: number;
    participatedVotings: number;
    messages: Message[];
};

type AdminPlayer = {
    name: string;
    backpackCapacity: number;
    points: number;
    uniqueIdentifier: string;
    above13?: boolean | null;
    parentalAuth?: boolean | null;
    currentAvatarId?: number | null;
    gameStatistics?: GameStatistics;
    profile_id?: string;
    clan_id?: string;
    battleCharacter_ids?: string[];
    avatar?: Avatar;
    clanRole_id: string | null;
    _id: string;
};

type ClansForBox = Omit<IClan, 'Player' | 'labels'> & {
    clanLogo: {
        logoType: string;
        pieceColors: string[];
    };
    points: number;
    password: string;
    ageRange: string;
    goal: string;
    language: string;
    roles: {
        name: string;
        clanRoleType: string;
        rights: Record<string, unknown>;
        _id: Record<string, unknown>;
    }[];
};

type CreateBoxResponse = {
    data: {
        Box: Omit<Box, 'adminPassword' | 'testersSharedPassword' | 'accountClaimersIds'> & {
            accesToken: string;
            adminPlayer: AdminPlayer;
            // currently Postman does not return clans, but it is in the Swagger example
            // clans: ClansForBox[];
        };
    };
    metaData: MetaData;
};

// TODO
type ResetBoxResponse = {};

type AddDailyTaskResponse = {};

type AddMultipleDailyTasksResponse = {};

type GetBoxResponse = ResponseShapeArray<'Box', Box>;

type BoxValidationError = {
    response: string;
    status: number;
    message: string;
    name: string;
    reason: string;
    field: string;
    value: unknown;
    additional?: string;
    statusCode: number;
    objectType: string;
};

type BoxErrorResponse = {
    statusCode: number;
    errors: BoxValidationError[];
};

export type {
    Box,
    GetBoxResponse,
    DailyTask,
    CreateBoxResponse,
    BoxErrorResponse,
    BoxValidationError,
    AdminPlayer,
    ClansForBox,
    ResetBoxResponse,
    AddDailyTaskResponse,
    AddMultipleDailyTasksResponse,
};
