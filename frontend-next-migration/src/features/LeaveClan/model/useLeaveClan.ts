import { useLeaveClanMutation } from "@/entities/Clan";
import { useState } from "react";
import { toast } from "react-toastify";
import { useClientTranslation } from "@/shared/i18n";
import { useParams } from "next/navigation";

const useLeaveClan = () => {
   const { lng } = useParams();
   const language = lng as string;
   const { t } = useClientTranslation(language, "clan");
   const [leaveClan] = useLeaveClanMutation();
   const [isCancelled, setIsCancelled] = useState(false);

   const handleLeave = async (onSuccess?: () => void) => {
      const isConfirmed = window.confirm(t("toast_confirm"));

      if (isConfirmed) {
         try {
            const result = await leaveClan().unwrap();

            toast.success(t("toast_left_clan"));
            if (onSuccess) onSuccess();
            setIsCancelled(false);
         } catch (error) {
            toast.error(`${t("toast_error")}: ${error}`);
            setIsCancelled(true);
         }
      } else {
         toast.info(t("toast_action_canceled"), { autoClose: 1500 });
         setIsCancelled(true);
      }
   };

   return { isCancelled, handleLeave };
};

export default useLeaveClan;