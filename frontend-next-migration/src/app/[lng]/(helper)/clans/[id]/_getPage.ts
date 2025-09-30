import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { ClanRoomSubPageProps } from '@/preparedPages/ClanPages';
import { envHelper } from '@/shared/const/envHelper';
import { notFound } from 'next/navigation';
import { getRouteOneClanPage } from '@/shared/appLinks/RoutePaths';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

const OG_FALLBACK = `${baseUrl}/images/opengraph-image.png`;

export async function _getPage(lng: string, id: string) {
    const { t } = await useServerTranslation(lng, 'clan');
    const response = await fetch(`${envHelper.apiLink}/clan/${id}`);
    if (!response.ok) {
        return notFound();
    }

    // Routes & SEO
    const clanData = await response.json();
    const clan = clanData?.data?.Clan ?? {};

    const relPath = getRouteOneClanPage(encodeURIComponent(id));
    const path = `/${lng}${relPath}`;
    const title = `${t('head-title')}: ${clan.name ?? ''}`;
    const description = clan.phrase?.trim() || t('head-description');
    const keywords = `${t('head-keywords')}${clan.tag ? `, ${clan.tag}` : ''}`;
    const ogImage = clan.ogImageUrl?.startsWith('http') ? clan.ogImageUrl : OG_FALLBACK;

    return createPage<ClanRoomSubPageProps>({
        buildPage: () => ({
            translations: {
                toastMessages: {
                    error: t('toast_error'),
                    notLoggedIn: t('toast_notloggedin'),
                    clanNotOpen: t('toast_clan_not_open'),
                    editMode: t('toast_edit_mode'),
                },
                buttons: {
                    joinClan: t('join_clan_btn'),
                    leaveClan: t('leave_clan_btn'),
                    editClan: t('edit_clan_btn'),
                },
                clanInfo: {
                    memberListTitle: t('member_list'),
                    mottoText: t('motto'),
                    infoText: t('info'),
                    assetsText: t('assets'),
                    memberCountText: t('members_count'),
                    languageText: t('language'),
                    goalText: t('goal'),
                    ageLimitText: t('age_limit'),
                    winsText: t('wins'),
                    lossesText: t('losses'),
                },
            },
        }),
        buildSeo: () => ({
            title,
            description,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title,
                description,
                url: path,
                images: [ogImage],
            },
            alternates: { canonical: path },
        }),
    });
}
