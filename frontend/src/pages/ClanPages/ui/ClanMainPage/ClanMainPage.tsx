import {ComponentType, useEffect} from "react";
import {Navbar} from "@/widgets/Navbar";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import {Container} from "@/shared/ui/Container";
import backgroundImg from "@/shared/assets/images/clanBg/Optimized-Moon.jpg"
import cls from "./ClanMainPage.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {NewClanForm} from "@/features/AddNewClan";


type Props = {
    HasOutletChildren: ComponentType;

}

const ClanMainPage = ({ HasOutletChildren}: Props) => {

    return (
        <div className={cls.Wrapper} style={{ backgroundImage: `url(${backgroundImg})` }}>
            <Navbar className={cls.Navbar} />
            <Container className={cls.Container}>

                <div style={{display: "flex" , gap: "10px"}}>
                    <Link to={RoutePaths.clan_all}>All Clans</Link>
                    <Link to={RoutePaths.clan_add_new}>Add Clan</Link>
                    {/*<Link to="/openClan">Open Clan</Link>*/}
                </div>

                <div className={cls.ClansViewMain}>
                    <HasOutletChildren />
                </div>


            </Container>

        </div>
    );
};


export const OpenClanView = () => <div>Clan view</div>;




export default ClanMainPage;