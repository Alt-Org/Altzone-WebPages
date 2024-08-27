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
            toastError={t('toast_error')}
            toastNotLoggedIn={t('toast_notloggedin')}
            toastClanNotOpen={t('toast_clan_not_open')}
            toastEditMode={t('toast_edit_mode')}
            joinClanBtn={t('join_clan_btn')}
            leaveClanBtn={t("leave_clan_btn")}
            editClanBtn={t("edit_clan_btn")}
            memberListTitle={t("member_list")}
            mottoText={t("motto")}
            infoText={t("info")}
            assetsText={t("assets")}
            memberCountText={t("members_count")}
            languageText={t("language")}
            goalText={t("goal")}
            ageLimitText={t("age_limit")}
            winsText={t("wins")}
            lossesText={t("losses")}

        />
    );

}