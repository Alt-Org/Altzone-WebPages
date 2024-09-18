import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import cls from "./ButtonField.module.scss";
import { toast } from "react-toastify";
import { useJoinClan } from "@/features/JoinClan";
import { useLeaveClan } from "@/features/LeaveClan";
import lock from "@/shared/assets/images/clanLogos/lock.png";
import Image from "next/image";
import { useClanRoles } from "@/shared/lib/hooks/useClanRoles";
import { useUserPermissions } from '@/entities/Auth/';

type Props = {
    clanData: any;
    error: string;
    notLoggedIn: string;
    clanNotOpen: string;
    editMode: string;
    joinClan: string;
    leaveClan: string;
    editClan: string;
}

const ClanInfo = (props: Props) => {
    const {
        clanData: clanData,
        error: toastError,
        notLoggedIn: toastNotLoggedIn,
        clanNotOpen: toastClanNotOpen,
        editMode: toastEditMode,
        joinClan: joinClanBtn,
        leaveClan: leaveClanBtn,
        editClan: editClanBtn,
    } = props;

    const { isAdmin, isInClan, playerId } = useClanRoles(clanData.admin_ids, clanData.Player);
    const { handleJoin } = useJoinClan();
    const { handleLeave } = useLeaveClan();
    const { canI } = useUserPermissions();

    return (
        <>
            {!canI('canISeeLogout') ? (
                <Button
                    className={cls.JoinClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => toast.error(toastNotLoggedIn)} >
                    {joinClanBtn}
                </Button>
            ) : canI('canISeeLogout') && !clanData.isOpen ? (<>
                <Button
                    className={cls.JoinClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => toast.error(toastClanNotOpen)} >
                    {joinClanBtn}
                </Button>
                <Image
                    src={lock}
                    alt={"clan logo"}
                    className={cls.lock} /></>
            ) : canI('canISeeLogout') && !isInClan ? (
                <Button
                    className={cls.JoinClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => handleJoin(clanData._id, playerId ?? "", "join")} >
                    {joinClanBtn}
                </Button>
            ) : (
                <Button
                    className={cls.DeleteClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => handleLeave()} >
                    {leaveClanBtn}
                </Button>
            )
            }
            {/* {isAdmin && (
                <Button
                    className={cls.EditClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => toast.success(toastEditMode)} >
                    {editClanBtn}
                </Button>
            )
            } */}
        </>
    );
};

export default ClanInfo;
