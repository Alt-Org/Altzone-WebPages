import { gameApi, GameApiCacheTags } from '@/shared/api';
import {
    GetBoxResponse,
    CreateBoxResponse,
    ResetBoxResponse,
    AddDailyTaskResponse,
    AddMultipleDailyTasksResponse,
} from '../types/types';

const boxUrl = 'box';

export type BoxAdminCreds = {
    adminPassword: string;
    playerName: string;
    clanNames: string[];
};

export type AddDailyTaskParams = {
    type: string;
    title: string;
    amount: number;
    points: number;
    coins: number;
    timeLimitMinutes: number;
};

export type ClansToCreate = {
    name: string;
    isOpen: boolean;
};

export type UpdateBoxArgs = {
    clansToCreate: ClansToCreate[];
    testersAmount: number;
    testersSharedPassword: string;
};

export type DefineTestersAmountArgs = {
    amountToAdd: number;
    amountToRemove: number;
};

const boxApi = gameApi.injectEndpoints({
    endpoints: (builder) => ({
        /** Tester can claim his/her account for the testing box.
         * * @param {string} password - The password to claim the tester account.
         * @returns {void} - No content is returned upon successful claim.
         */
        claimTesterAccount: builder.query<void, string>({
            query: (password) => ({
                url: `${boxUrl}/claim-account?password=${password}`,
            }),
            providesTags: [GameApiCacheTags.BOX],
        }),

        /** Create a new testing box.
         * @param {BoxAdminCreds} creds - Credentials for creating a box.
         * @returns {CreateBoxResponse} - Response containing the created box data.
         */
        createBox: builder.mutation<CreateBoxResponse, BoxAdminCreds>({
            query: (creds) => ({
                url: boxUrl,
                method: 'POST',
                body: creds,
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Deletes the box data associated with the logged-in user.
         * @returns {void} - No content is returned upon successful deletion.
         */
        deleteBox: builder.mutation<void, void>({
            query: () => ({
                url: boxUrl,
                method: 'DELETE',
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Resets the testing box data. Removes all data created during the testing session
         * and returns the box state to the PREPARING stage.
         * @returns {ResetBoxResponse} - No content is returned upon successful reset.
         */
        resetBox: builder.mutation<ResetBoxResponse, void>({
            query: () => ({
                url: `${boxUrl}/reset`,
                method: 'PUT',
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Starts the testing session for the box.
         * @returns {void} - No content is returned upon successful start.
         */
        startTestingSession: builder.mutation<void, void>({
            query: () => ({
                url: `${boxUrl}/start`,
                method: 'POST',
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        // Get box data by id
        getBoxById: builder.query<GetBoxResponse, string>({
            query: (boxId) => ({
                url: `${boxUrl}/${boxId}`,
                method: 'GET',
            }),
            providesTags: [GameApiCacheTags.BOX],
        }),

        /** Deletes the box data by its id.
         * @param {string} boxId - The id of the box to delete.
         * @returns {void} - No content is returned upon successful deletion.
         */
        deleteBoxById: builder.mutation<void, string>({
            query: (boxId) => ({
                url: `${boxUrl}/${boxId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Add a daily task to array of predefined daily tasks.
         * @param {AddDailyTaskParams} dailyTask - The daily task data to be added.
         * @returns {AddDailyTaskResponse} - The response containing the added daily task data.
         */
        addDailyTaskToBox: builder.mutation<AddDailyTaskResponse, AddDailyTaskParams>({
            query: (dailyTask) => ({
                url: `${boxUrl}/dailyTask`,
                method: 'POST',
                body: dailyTask,
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Update a predefined daily task of a box by its _id
         * @param {AddDailyTaskParams & { _id: string }} dailyTask - The daily task data to update, including its _id.
         * @returns {void} - No content is returned upon successful update.
         */
        updateBoxDailyTask: builder.mutation<void, AddDailyTaskParams & { _id: string }>({
            query: (dailyTask) => ({
                url: `${boxUrl}/dailyTask`,
                method: 'PUT',
                body: dailyTask,
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Add multiple daily tasks at once to daily tasks array of the box
         * @param {string[]} dailyTasks - An array of daily tasks to be added.
         * @returns {AddMultipleDailyTasksResponse} - The response containing the added daily tasks data.
         */
        addMultipleDailyTasks: builder.mutation<AddMultipleDailyTasksResponse, string[]>({
            query: (dailyTasks) => ({
                url: `${boxUrl}/dailyTask/multiple`,
                method: 'POST',
                body: dailyTasks,
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Delete daily task from predefined daily tasks array of the box.
         * @param {string} _id - The _id of the daily task to be deleted.
         * @returns {void} - No content is returned upon successful deletion.
         */
        deleteBoxDailyTask: builder.mutation<void, string>({
            query: (_id) => ({
                url: `${boxUrl}/dailyTask/${_id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),

        /** Adjust amount of testers in the box
         * @param {DefineTestersAmountArgs} args - The arguments containing amount to add and remove.
         * @returns {void} - No content is returned upon successful adjustment.
         */
        defineTestersAmount: builder.mutation<void, DefineTestersAmountArgs>({
            query: (args) => ({
                url: `${boxUrl}/testers`,
                method: 'POST',
                body: args,
            }),
            invalidatesTags: [GameApiCacheTags.BOX],
        }),
    }),
});

export const { useCreateBoxMutation } = boxApi;
