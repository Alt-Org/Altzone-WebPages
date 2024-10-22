import { toast } from 'react-toastify';
import { useJoinClanMutation } from '@/entities/Clan';
import { useClientTranslation } from '@/shared/i18n';

const useJoinClan = () => {
    const { t } = useClientTranslation('clan');
    const [joinClan] = useJoinClanMutation();

    // todo good function should not use too much params, think if you could group some or all params to object group(s)
    const handleJoin = async (
        clan_id: string,
        player_id: string,
        join_message: string,
        onSuccess?: () => void,
    ) => {
        const result = await joinClan({ clan_id, player_id, join_message });
        // @ts-ignore todo figure out ts
        if (result?.error) {
            // @ts-ignore todo figure out ts
            toast.error(`${JSON.stringify(result?.error)}`);
            return;
        }
        toast.success(t('toast_join_success'));
        if (onSuccess) onSuccess();
        return;
    };

    return { handleJoin };
};

export default useJoinClan;
