import Image from "next/image";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useJoinClan } from "@/features/JoinClan";
import { useLeaveClan } from "@/features/LeaveClan";
import { selectProfile, useUserPermissionsV2, PermissionError } from "@/entities/Auth";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import lock from "@/shared/assets/images/clanLogos/lock.png";
import cls from "./ButtonField.module.scss";

// import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
// import cls from "./ButtonField.module.scss";
// import { toast } from "react-toastify";
// import { useJoinClan } from "@/features/JoinClan";
// import { useLeaveClan } from "@/features/LeaveClan";
// import lock from "@/shared/assets/images/clanLogos/lock.png";
// import Image from "next/image";
// import {selectProfile, useUserPermissionsV2} from "@/entities/Auth";
// import { useSelector } from "react-redux";
// import { useUserPermissions } from '@/entities/Auth/';
//
// type Props = {
//     clanData: any;
//     error: string;
//     notLoggedIn: string;
//     clanNotOpen: string;
//     editMode: string;
//     joinClan: string;
//     leaveClan: string;
//     editClan: string;
// }
//
// const ClanInfo = (props: Props) => {
//     const {
//         clanData: clanData,
//         error: toastError,
//         notLoggedIn: toastNotLoggedIn,
//         clanNotOpen: toastClanNotOpen,
//         editMode: toastEditMode,
//         joinClan: joinClanBtn,
//         leaveClan: leaveClanBtn,
//         editClan: editClanBtn,
//     } = props;
//
//     const { handleJoin } = useJoinClan();
//     const { handleLeave } = useLeaveClan();
//
//
//     const { canI } = useUserPermissions();
//
//     const {checkPermissionFor} = useUserPermissionsV2();
//     // todo Sakari please improve the logic,to use error enums
//     const permissionToSeeClans = checkPermissionFor("clan:seeAll");
//
//     const user = useSelector(selectProfile);
//     const playerId: string | undefined = user?.Player?._id;
//     const isInClan = playerId ? clanData.Player.some((player: { _id: string; }) => player._id === playerId) : false;
//
//
//
//     // return (
//     //     <>
//     //         {!canI('canISeeClans') ? (
//     //             <Button
//     //                 className={cls.JoinClanBtn}
//     //                 theme={ButtonTheme.Graffiti}
//     //                 size={ButtonSize.L}
//     //                 onClick={() => toast.error(toastNotLoggedIn)} >
//     //                 {joinClanBtn}
//     //             </Button>
//     //         ) : canI('canISeeClans') && !clanData.isOpen ? (<>
//     //             <Button
//     //                 className={cls.JoinClanBtn}
//     //                 theme={ButtonTheme.Graffiti}
//     //                 size={ButtonSize.L}
//     //                 onClick={() => toast.error(toastClanNotOpen)} >
//     //                 {joinClanBtn}
//     //             </Button>
//     //             <Image
//     //                 src={lock}
//     //                 alt={"clan logo"}
//     //                 className={cls.lock} /></>
//     //         ) : canI('canISeeClans') && !isInClan ? (
//     //             <Button
//     //                 className={cls.JoinClanBtn}
//     //                 theme={ButtonTheme.Graffiti}
//     //                 size={ButtonSize.L}
//     //                 onClick={() => handleJoin(clanData._id, playerId ?? "", "join")} >
//     //                 {joinClanBtn}
//     //             </Button>
//     //         ) : (
//     //             <Button
//     //                 className={cls.DeleteClanBtn}
//     //                 theme={ButtonTheme.Graffiti}
//     //                 size={ButtonSize.L}
//     //                 onClick={() => handleLeave()} >
//     //                 {leaveClanBtn}
//     //             </Button>
//     //         )
//     //         }
//     //         {/* {isAdmin && (
//     //             <Button
//     //                 className={cls.EditClanBtn}
//     //                 theme={ButtonTheme.Graffiti}
//     //                 size={ButtonSize.L}
//     //                 onClick={() => toast.success(toastEditMode)} >
//     //                 {editClanBtn}
//     //             </Button>
//     //         )
//     //         } */}
//     //     </>
//     // );
// };
//
// export default ClanInfo;
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

//todo Sakari please refactor it to use our new permission hook, and probably we should use clan:join permission instead clan:all
const ClanInfo = (props: Props) => {
    const {
        clanData,
        // error: toastError,
        notLoggedIn: toastNotLoggedIn,
        // clanNotOpen: toastClanNotOpen,
        // editMode: toastEditMode,
        joinClan: joinClanBtn,
        leaveClan: leaveClanBtn,
        // editClan: editClanBtn,
    } = props;

    const { handleJoin } = useJoinClan();
    const { handleLeave } = useLeaveClan();

    const { checkPermissionFor } = useUserPermissionsV2();
    const permissionToSeeClans = checkPermissionFor("clan:seeAll");

    const user = useSelector(selectProfile);
    const playerId: string | undefined = user?.Player?._id;
    const isInClan = playerId ? clanData.Player.some((player: { _id: string }) => player._id === playerId) : false;

    /**
     * Handles permission errors by displaying appropriate toast messages.
     * @param error - The permission error encountered.
     */
    const handlePermissionError = (error?: PermissionError) => {
        if (!error) return;
        switch (error) {
            case PermissionError.NotAuthenticated:
                toast.error(toastNotLoggedIn);
                break;
            case PermissionError.AlreadyInClan:
                toast.error("You are already a member of a clan.");
                break;
            case PermissionError.NotInClan:
                toast.error("You are not a member of any clan.");
                break;
            case PermissionError.ClanLimitExceeded:
                toast.error("Clan limit has been reached.");
                break;
            case PermissionError.UnknownPermission:
            default:
                toast.error("Unknown access error.");
                break;
        }
    };

    return (
        <>
            {!permissionToSeeClans.isGranted ? (
                // User does not have permission to view clans
                <Button
                    className={cls.JoinClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => handlePermissionError(permissionToSeeClans.error)} >
                    {joinClanBtn}
                </Button>
            ) : !clanData.isOpen ? (
                // Clan is closed for viewing
                <>
                    <Button
                        className={cls.JoinClanBtn}
                        theme={ButtonTheme.Graffiti}
                        size={ButtonSize.L}
                        onClick={() => handlePermissionError(PermissionError.ClanLimitExceeded)} >
                        {joinClanBtn}
                    </Button>
                    <Image
                        src={lock}
                        alt="Clan Logo"
                        className={cls.lock} />
                </>
            ) : !isInClan ? (
                // User is not a member of the clan
                <Button
                    className={cls.JoinClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => handleJoin(clanData._id, playerId ?? "", "join")} >
                    {joinClanBtn}
                </Button>
            ) : (
                // User is a member of the clan
                <Button
                    className={cls.DeleteClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => handleLeave()} >
                    {leaveClanBtn}
                </Button>
            )}
            {/* Uncomment the section below to add an edit button for administrators */}
            {/* {isAdmin && (
                <Button
                    className={cls.EditClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => toast.success(toastEditMode)} >
                    {editClanBtn}
                </Button>
            )} */}
        </>
    );
};

export default ClanInfo;
