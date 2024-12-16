import { envHelper } from '@/shared/const/envHelper';
import { createDirectus, createItem, rest } from '@directus/sdk';
import { Feedback } from '../model/types/types';

const directusBaseUrl = envHelper.directusHost;
const client = createDirectus(directusBaseUrl).with(rest());

export const feedbackApi = async (data: Feedback): Promise<boolean> => {
    try {
        await client.request(createItem('feedback', data));
        return true;
    } catch (error: any) {
        return false;
    }
};
