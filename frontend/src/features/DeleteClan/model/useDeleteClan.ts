import {useDeleteClanMutation} from "@/entities/Clan";
import {useState} from "react";
import {toast} from "react-toastify";

const useDeleteClan = () => {

   const [deleteClan] = useDeleteClanMutation();
   const [isCancelled, setIsCancelled] = useState(false);

   const handleDelete = async (clanId: string, onSuccess?: () => void) => {

      if (confirm("Are you sure?")) {
         const result = await deleteClan(clanId);

         // @ts-ignore
         if (result?.error) {
            // @ts-ignore
            toast.error(`${JSON.stringify(result.error)}`);
            setIsCancelled(true);
            return;
         }


         toast.success(`Clan was successfully deleted`);
         if(onSuccess) onSuccess();
         setIsCancelled(false);
         return;
      }

         toast.info('Deletion was cancelled', { autoClose: 1500 });
         setIsCancelled(true);
         return;
   };


   return { isCancelled, handleDelete };

}

export default useDeleteClan;