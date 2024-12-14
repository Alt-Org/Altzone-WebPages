import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';
import { ClanRoomSubPageProps } from '@/preparedPages/ClanPages';
import { envHelper } from '@/shared/const/envHelper';
import { notFound } from 'next/navigation';

export async function _getPage(lng: string, id: string) {
    const { t } = await useServerTranslation(lng, 'clan');
    const response = await fetch(`${envHelper.apiLink}/clan/${id}`);
    if (!response.ok) {
        return notFound();
    }
    const clanData = await response.json();
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
            title: `${t('head-title')}: ${clanData.data.Clan.name}`,
            description: `${clanData.data.Clan.phrase}`,
            keywords: `${t('head-keywords')}, ${clanData.data.Clan.tag}`,
        }),
    });
}
