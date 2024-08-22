import {useServerTranslation} from "@/shared/i18n";
import {ProfilePage} from "@/preparedPages/ProfilePage";

type Props = {
    params: { lng: string };
};

export default async function DefaultPage({ params }: Props) {
    const { t } = await useServerTranslation(params.lng, 'profile');
    return (
        <ProfilePage
            title="Profile Deletion"
            profileDeletionText={t('profile-deletion')}
            profileDeletionInfoText={t('profile-deletion-info')}
        />
    );
}