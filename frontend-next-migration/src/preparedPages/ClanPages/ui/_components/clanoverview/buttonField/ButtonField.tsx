import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import cls from "./ButtonField.module.scss";
import { toast } from "react-toastify";
import { useJoinClan } from "@/features/JoinClan";
import { useLeaveClan } from "@/features/LeaveClan";
import { useEffect, useState } from "react";
import lock from "@/shared/assets/images/clanLogos/lock.png";
import { selectProfile } from "@/entities/Auth";
import { useSelector } from "react-redux";
import Image from "next/image";

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

    const user = useSelector(selectProfile);

    const playerId: string | undefined = user?.Player?._id;

    useEffect(() => {
        if (clanData.isOpen) {
            setIsOpen(true)
        }
        if (playerId) {
            setLoggedIn(true);

            if (clanData.admin_ids.includes(playerId)) {
                setIsAdmin(true);
            }

            if (clanData.Player.some((player: { _id: string; }) => player._id === playerId)) {
                setIsInClan(true);
            }
        } else {
            setLoggedIn(false);
            setIsInClan(false);
        }
    }, [playerId, clanData.Player, clanData.isOpen]);

    const { handleJoin } = useJoinClan();
    const { handleLeave } = useLeaveClan();
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isInClan, setIsInClan] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {!isLoggedIn ? (
                <Button
                    className={cls.JoinClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => toast.error(toastNotLoggedIn)} >
                    {joinClanBtn}
                </Button>
            ) : isLoggedIn && !isOpen ? (<>
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
            ) : isLoggedIn && !isInClan ? (
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
            {isAdmin && (
                <Button
                    className={cls.EditClanBtn}
                    theme={ButtonTheme.Graffiti}
                    size={ButtonSize.L}
                    onClick={() => toast.success(toastEditMode)} >
                    {editClanBtn}
                </Button>
            )
            }
        </>
    );
};

export default ClanInfo;
