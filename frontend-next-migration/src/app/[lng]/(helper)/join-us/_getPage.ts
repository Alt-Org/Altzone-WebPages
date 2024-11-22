import { createPage } from '@/app/_helpers';
import { JoinUsProps } from '@/preparedPages/JoinUsPage';
import { useServerTranslation } from '@/shared/i18n';
import {
    makeDiscordBlock,
    makeRedditBlock,
    makeDuunitoriBlock,
    makeFeedbackBlock,
    makeTeachersBlock,
    makeInstagramBlock,
} from '@/entities/JoinUs';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'join-us');
    return createPage<JoinUsProps>({
        buildPage: () => ({
            title: t('join-us'),
            discordBlock: makeDiscordBlock(t),
            redditBlock: makeRedditBlock(t),
            teachersBlock: makeTeachersBlock(t),
            feedbackBlock: makeFeedbackBlock(t),
            duunitoriBlock: makeDuunitoriBlock(t),
            instagramBlock: makeInstagramBlock(t),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
