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
import { getRouteJoinUsPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'join-us');
    return createPage<JoinUsProps>({
        buildPage: () => ({
            title: t('join-us'),
            discordBlock: makeDiscordBlock(t),
            connectionBlock: makeRedditBlock(t),
            teachersBlock: makeTeachersBlock(t),
            feedbackBlock: makeFeedbackBlock(t),
            duunitoriBlock: makeDuunitoriBlock(t),
            instagramBlock: makeInstagramBlock(t),
        }),
        buildSeo: () => ({
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
            openGraph: {
                ...defaultOpenGraph,
                title: t('og-title'),
                description: t('og-description'),
                url: `/${lng}${getRouteJoinUsPage()}`,
            },
            alternates: {
                canonical: `/${lng}${getRouteJoinUsPage()}`,
            },
        }),
    });
}
