import { teacherApi, TeacherApiCacheTags } from '@/shared/api/teacherApi';
import { GetBoxResponse, CreateBoxResponse, Box } from '../types/types';

const boxUrl = 'box';

export type BoxAdminCreds = {
    adminPassword: string;
    playerName: string;
};

export type DailyTaskParams = {
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

const boxApi = teacherApi.injectEndpoints({
    endpoints: (builder) => ({
        /** This endpoint is used to create a new testing box.
         * The response includes the created box data.
         * @param {BoxAdminCreds} creds - Credentials for creating a box. Includes admin password and player name.
         * @returns {CreateBoxResponse} - Response containing the created box data.
         * @throws {BoxErrorResponse} - If the box creation fails.
         */
        createBox: builder.mutation<CreateBoxResponse, BoxAdminCreds>({
            query: (creds) => ({
                url: boxUrl,
                method: 'POST',
                body: creds,
            }),
            invalidatesTags: [TeacherApiCacheTags.BOX],
        }),
        /** This endpoint updates the box configuration with the provided clans to create,
         * number of testers, and shared password for testers.
         * @param {UpdateBoxArgs} boxToUpdate - The box configuration to update.
         * @returns {void} - No content is returned upon successful update.
         * @throws {BoxErrorResponse} - If the update fails.
         */
        updateBox: builder.mutation<void, UpdateBoxArgs>({
            query: (boxToUpdate) => ({
                url: boxUrl,
                method: 'PATCH',
                body: boxToUpdate,
            }),
            invalidatesTags: [TeacherApiCacheTags.BOX],
        }),
        /** This endpoint deletes the box data associated with the logged-in user.
         * @returns {void} - No content is returned upon successful deletion.
         * @throws {BoxErrorResponse} - If the deletion fails.
         */
        deleteBox: builder.mutation<void, void>({
            query: () => ({
                url: boxUrl,
                method: 'DELETE',
            }),
            invalidatesTags: [TeacherApiCacheTags.BOX],
        }),
        /** This endpoint retrieves all boxes.
         * @returns {GetBoxResponse} - Response containing an array of boxes, metadata and pagination data
         * @throws {BoxErrorResponse} - If the retrieval fails.
         */
        getBoxes: builder.query<GetBoxResponse, void>({
            query: () => ({
                url: boxUrl,
                method: 'GET',
            }),
            providesTags: [TeacherApiCacheTags.BOX],
        }),
        /** This endpoint resets the testing box. Removes all data created during the testing session
         * and returns the box state to the PREPARING stage.
         * @returns {void} - No content is returned upon successful reset.
         * @throws {BoxErrorResponse} - If the reset fails.
         */
        resetBox: builder.mutation({
            query: () => ({
                url: `${boxUrl}/reset`,
                method: 'PUT',
            }),
            invalidatesTags: [TeacherApiCacheTags.BOX],
        }),
        // Start testing session
        startTestingSession: builder.mutation<void, void>({
            query: () => ({
                url: `${boxUrl}/start`,
                method: 'POST',
            }),
            invalidatesTags: [TeacherApiCacheTags.BOX],
        }),
        // Get box data by id
        getBoxById: builder.query<GetBoxResponse, string>({
            query: (boxId) => ({
                url: `${boxUrl}/${boxId}`,
                method: 'GET',
            }),
            providesTags: [TeacherApiCacheTags.BOX],
        }),
        // Delete box by id
        deleteBoxById: builder.mutation<void, string>({
            query: (boxId) => ({
                url: `${boxUrl}/${boxId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [TeacherApiCacheTags.BOX],
        }),
        // Add a daily task to box
        addDailyTaskToBox: builder.mutation<void, DailyTaskParams>({
            query: (dailyTask) => ({
                url: `${boxUrl}/dailyTask`,
                method: 'POST',
                body: dailyTask,
            }),
            invalidatesTags: [TeacherApiCacheTags.BOX],
        }),
    }),
});

export const { useCreateBoxMutation } = boxApi;
