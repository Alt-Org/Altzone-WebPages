import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { ClanRoomSubPageProps } from '@/preparedPages/ClanPages';
import { envHelper } from '@/shared/const/envHelper';
import { notFound } from 'next/navigation';
import { baseUrl } from '@/shared/seoConstants';

export async function _getPage(lng: string, id: string) {
    const { t } = await useServerTranslation(lng, 'clan');
    const response = await fetch(`${envHelper.apiLink}/clan/${id}`);
    if (!response.ok) {
        return notFound();
    }
    const clanData = await response.json();
    const clan = clanData?.data?.Clan ?? {};
    const path = `/${lng}/clans/${id}`;

    const imagePath = '/images/opengraph-image.png';
    const imageAbs = `${baseUrl}${imagePath}`;

    const title = `${t('head-title')}: ${clan.name ?? ''}`;
    const description = clan.phrase ?? t('head-description');
    const keywords = `${t('head-keywords')}${clan.tag ? `, ${clan.tag}` : ''}`;

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
            alternates: { canonical: path },
            openGraph: {
                type: 'website',
                title,
                description,
                url: path,
                images: [{ url: imageAbs, width: 1200, height: 630 }],
            },
        }),
    });
}
