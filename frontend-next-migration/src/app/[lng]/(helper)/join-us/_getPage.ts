import { createPage } from '@/app/_helpers';
import { JoinUsProps } from '@/preparedPages/JoinUsPage';
import { getServerTranslation } from '@/shared/i18n';
import {
    makeGetInTouchAndFollowBlock,
    makeCommunityAndOpportunitiesBlock,
    makeEducationProfessionalsBlock,
    makeFeedbackBlock,
} from '@/entities/JoinUs';
import { getRouteJoinUsPage } from '@/shared/appLinks/RoutePaths';
import { defaultOpenGraph } from '@/shared/seoConstants';

export async function _getPage(lng: string) {
    const { t } = await getServerTranslation(lng, 'join-us');

    return createPage<JoinUsProps>({
        buildPage: () => ({
            title: t('join-us'),
            getInTouchAndFollowBlock: makeGetInTouchAndFollowBlock(t),
            communityAndOpportunitiesBlock: makeCommunityAndOpportunitiesBlock(t),
            educationProfessionalsBlock: makeEducationProfessionalsBlock(t),
            feedbackBlock: makeFeedbackBlock(t),
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
