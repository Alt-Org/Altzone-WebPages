import { useState } from 'react';
import { toast } from 'react-toastify';
import { useLeaveClanMutation } from '@/entities/Clan';
import { useClientTranslation } from '@/shared/i18n';

const useLeaveClan = () => {
    const { t } = useClientTranslation('clan');
    const [leaveClan] = useLeaveClanMutation();
    const [isCancelled, setIsCancelled] = useState(false);

    const handleLeave = async (onSuccess?: () => void) => {
        const isConfirmed = window.confirm(t('toast_confirm'));
        if (isConfirmed) {
            const result = await leaveClan();
            // @ts-ignore - RTK Query trigger result is a union; runtime check for `error` is intentional
            if (result.error) {
                // @ts-ignore - Reading `error` from mutation result for user-facing toast message
                toast.error(`${t('toast_error')}: ${result.error}`);
                setIsCancelled(true);
                return;
            }

            toast.success(t('toast_left_clan'));
            if (onSuccess) onSuccess();
            setIsCancelled(false);
            return;
        }

        toast.info(t('toast_action_canceled'), { autoClose: 1500 });
        setIsCancelled(true);
        return;
    };

    return { isCancelled, handleLeave };
};

export default useLeaveClan;
