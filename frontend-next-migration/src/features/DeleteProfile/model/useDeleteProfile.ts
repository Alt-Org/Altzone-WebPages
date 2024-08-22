import { useDeleteProfileMutation } from "@/entities/Profile";
import { useState } from "react";
import { toast } from "react-toastify";

const useDeleteProfile = () => {
   const [deleteClan] = useDeleteProfileMutation();
   const [isCancelled, setIsCancelled] = useState(false);
   const handleDelete = async (onSuccess?: () => void) => {
      //todo add i18n
      if (confirm("Oletko varma?")) {
         try {
            await deleteClan().unwrap(); // Call the mutation without arguments
            toast.success('Profiili poistettiin onnistuneesti');
            if (onSuccess) onSuccess();
            setIsCancelled(false);
         } catch (error) {
            toast.error(`Virhe poistettaessa profiilia: ${error}`);
            setIsCancelled(true);
         }
      } else {
         toast.info('Poisto peruutettiin', { autoClose: 1500 });
         setIsCancelled(true);
      }
   };

   return { isCancelled, handleDelete };
};

export default useDeleteProfile;