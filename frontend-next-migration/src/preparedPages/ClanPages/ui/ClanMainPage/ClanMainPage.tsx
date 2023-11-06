import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import { selectProfile } from "@/entities/Auth";
import cls from "./ClanMainPage.module.scss";
import backgroundImage from "@/shared/assets/images/clanBg/Moon.webp"
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

const ClanMainPage = () => {
    const router = useRouter();

    const user = useSelector(selectProfile);

    const [canShowAddNew, setCanShowAddNew] = useState(false);
    const [canShowUserClan, setShowUserClan] = useState(false);

    useEffect(() => {
        if(!user) {
            setShowUserClan(false);
            setCanShowAddNew(false);
            return;
        }

        if(!user.Player.clan_id){
            setCanShowAddNew(true);
            setShowUserClan(false);
            return;
        }

        setShowUserClan(true);
        setCanShowAddNew(false);

    },[user]);

    return (
        <div className={cls.Wrapper}>
            <Navbar className={cls.Navbar} />
            <Container className={cls.Container}>
                <div style={{display: "flex" , gap: "10px"}}>
                    <Link href={RoutePaths.clan_all}>Kaikki Klaanit</Link>
                    {canShowUserClan && <Link href={`${RoutePaths.clan}/${user?.Player.clan_id}`}>Minun klaani</Link>}
                    {canShowAddNew && <Link href={RoutePaths.clan_add_new}>Luo Klaani</Link>}
                </div>
                {/*{*/}
                {/*    router.pathname === RoutePaths.clan_all &&*/}
                {/*}*/}
            </Container>

        </div>
    );
};

export default withBackgroundImage({
    alt: "Clan-Page Japan sakura style background",
    imagePath: backgroundImage as unknown as string,
})(ClanMainPage);
