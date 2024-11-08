import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteClanMutation } from '@/entities/Clan';
import { useClientTranslation } from '@/shared/i18n';

const useDeleteClan = () => {
    const [deleteClan] = useDeleteClanMutation();
    const [isCancelled, setIsCancelled] = useState(false);
    const { t } = useClientTranslation('clan');

    const handleDelete = async (clanId: string, onSuccess?: () => void) => {
        if (confirm(t('confirm_delete_clan'))) {
            const result = await deleteClan(clanId);

            // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
            if (result?.error) {
                // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
                toast.error(`${JSON.stringify(result.error)}`);
                setIsCancelled(true);
                return;
            }

            toast.success(t('clan_deleted'));
            if (onSuccess) onSuccess();
            setIsCancelled(false);
            return;
        }

        toast.info(t('clan_delete_cancelled'), { autoClose: 1500 });
        setIsCancelled(true);
        return;
    };

    return { isCancelled, handleDelete };
};

export default useDeleteClan;
