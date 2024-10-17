import { toast } from "react-toastify";
import { useJoinClanMutation } from "@/entities/Clan";
import { useClientTranslation } from "@/shared/i18n";

const useJoinClan = () => {

   const { t } = useClientTranslation("clan");
   const [joinClan] = useJoinClanMutation();

   // todo good function should not use too much params, think if you could group some or all params to object group(s)
   const handleJoin = async (clan_id: string, player_id: string, join_message: string, onSuccess?: () => void) => {
      try {
         const _ = await joinClan({ clan_id, player_id, join_message }).unwrap();
         toast.success(t("toast_join_success"));
         if (onSuccess) onSuccess();
      } catch (error) {
         toast.error(`${JSON.stringify(error)}`);
      }
   };

   return { handleJoin };

}

export default useJoinClan;
