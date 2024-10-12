import { ClanRoomSubPage as PreparedPage } from "@/preparedPages/ClanPages";
import { useServerTranslation } from "@/shared/i18n";
import { Metadata } from "next";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const { t } = await useServerTranslation(params.lng, 'clan');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}

export default async function ClanRoomSubPage({ params }: Props) {
    const { t } = await useServerTranslation(params.lng, 'clan');

    return (
        <PreparedPage
            toastMessages={{
                error: t('toast_error'),
                notLoggedIn: t('toast_notloggedin'),
                clanNotOpen: t('toast_clan_not_open'),
                editMode: t('toast_edit_mode')
            }}
            buttons={{
                joinClan: t('join_clan_btn'),
                leaveClan: t("leave_clan_btn"),
                editClan: t("edit_clan_btn")
            }}
            clanInfo={{
                memberListTitle: t("member_list"),
                mottoText: t("motto"),
                infoText: t("info"),
                assetsText: t("assets"),
                memberCountText: t("members_count"),
                languageText: t("language"),
                goalText: t("goal"),
                ageLimitText: t("age_limit"),
                winsText: t("wins"),
                lossesText: t("losses")
            }}
        />
    );

}