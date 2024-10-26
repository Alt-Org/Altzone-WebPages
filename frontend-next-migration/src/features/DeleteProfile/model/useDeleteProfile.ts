import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteProfileMutation } from '@/entities/Profile';

const useDeleteProfile = () => {
    const [deleteProfile] = useDeleteProfileMutation();
    const [isCancelled, setIsCancelled] = useState(false);
    const handleDelete = async (onSuccess?: () => void) => {
        //todo add i18n
        if (confirm('Oletko varma?')) {
            const result = await deleteProfile();
            // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
            if (result?.error) {
                // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
                toast.error(`Virhe poistettaessa profiilia: ${JSON.stringify(result?.error)}`);
                setIsCancelled(true);
                return;
            }
            toast.success('Profiili poistettiin onnistuneesti');
            if (onSuccess) onSuccess();
            setIsCancelled(false);
            return;
        }

        toast.info('Poisto peruutettiin', { autoClose: 1500 });
        setIsCancelled(true);
        return;
    };

    return { isCancelled, handleDelete };
};

export default useDeleteProfile;
