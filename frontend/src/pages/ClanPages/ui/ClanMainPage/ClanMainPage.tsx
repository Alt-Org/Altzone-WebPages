import {ComponentType, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import backgroundImg from "@/shared/assets/images/clanBg/Optimized-Moon.jpg"
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {selectProfile} from "@/entities/Auth";
import cls from "./ClanMainPage.module.scss";


type Props = {
    HasOutletChildren: ComponentType;

}

const ClanMainPage = ({ HasOutletChildren}: Props) => {

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
        <div className={cls.Wrapper} style={{ backgroundImage: `url(${backgroundImg})` }}>
            <Navbar className={cls.Navbar} />
            <Container className={cls.Container}>
                <div style={{display: "flex" , gap: "10px"}}>
                    <Link to={RoutePaths.clan_all}>Kaikki Klaanit</Link>
                    {canShowUserClan && <Link to={RoutePaths.clan + `/${user?.Player.clan_id}`}>Minun klaani</Link>}
                    {canShowAddNew && <Link to={RoutePaths.clan_add_new}>Lisää Klaani</Link> }
                </div>

                <div className={cls.ClansViewMain}>
                    <HasOutletChildren />
                </div>

            </Container>

        </div>
    );
};



export default ClanMainPage;