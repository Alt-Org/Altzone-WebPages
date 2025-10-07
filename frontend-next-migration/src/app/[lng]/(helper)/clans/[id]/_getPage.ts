import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { ClanRoomSubPageProps } from '@/preparedPages/ClanPages';
import { envHelper } from '@/shared/const/envHelper';
import { notFound } from 'next/navigation';
import { getRouteOneClanPage } from '@/shared/appLinks/RoutePaths';
import type { IClan } from '@/entities/Clan';
import { baseUrl, defaultOpenGraph } from '@/shared/seoConstants';

const toAbsolute = (src?: string | null) =>
    !src ? null : /^https?:\/\//i.test(src) ? src : `${baseUrl}${src}`;

// Use fallback only, no clan-specific logo image exists
function getOgImageUrl(_: Partial<IClan>) {
    const fallback = defaultOpenGraph.images?.[0]?.url ?? null;
    return toAbsolute(fallback);
}

export async function _getPage(lng: string, id: string) {
    const { t } = await useServerTranslation(lng, 'clan');
    const response = await fetch(`${envHelper.apiLink}/clan/${id}`);
    if (!response.ok) {
        notFound();
    }

    const payload = await response.json();
    const clan = payload?.data?.Clan ?? {};

    const name = (clan.name as string | undefined)?.trim() || id;
    const desc = (clan.phrase as string | undefined)?.trim() || t('head-description');

    // Routes & SEO
    const relPath = getRouteOneClanPage(encodeURIComponent(id));
    const path = `/${lng}${relPath}`;
    const title = `${t('head-title')} — ${name}`;
    const keywords = `${t('head-keywords')}${clan.tag ? `, ${clan.tag}` : ''}`;

    const ogUrl = getOgImageUrl(clan);
    const ogImages = ogUrl
        ? [{ url: ogUrl, alt: `${name} — ${t('head-title')}` }]
        : (defaultOpenGraph.images ?? []);

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
            description: desc,
            keywords,
            openGraph: {
                ...defaultOpenGraph,
                type: 'website',
                title,
                description: desc,
                url: path,
                images: ogImages,
            },
            alternates: { canonical: path },
        }),
    });
}
