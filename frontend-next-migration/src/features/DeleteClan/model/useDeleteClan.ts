import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteClanMutation } from "@/entities/Clan";

const useDeleteClan = () => {

   const [deleteClan] = useDeleteClanMutation();
   const [isCancelled, setIsCancelled] = useState(false);

   const handleDelete = async (clanId: string, onSuccess?: () => void) => {

      // todo where is i18n
      if (confirm("Oletko varma?")) {
         const result = await deleteClan(clanId);

         // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
         if (result?.error) {
            // @ts-ignore todo it works but ts for some reason doesnt recognise the type, figure our why and fix
            toast.error(`${JSON.stringify(result.error)}`);
            setIsCancelled(true);
            return;
         }

         toast.success(`Klaani poistettiin onnistuneesti`);
         if(onSuccess) onSuccess();
         setIsCancelled(false);
         return;
      }

      toast.info('Poisto peruutettiin', { autoClose: 1500 });
      setIsCancelled(true);
      return;
   };

   return { isCancelled, handleDelete };

}

export default useDeleteClan;
