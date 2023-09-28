import {ComponentType, useEffect} from "react";
import {Navbar} from "@/widgets/Navbar";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import {Container} from "@/shared/ui/Container";
import backgroundImg from "@/shared/assets/images/clanBg/Optimized-Moon.jpg"
import cls from "./ClanMainPage.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";

type Clan = {
    ranking: number,
    clanMaster: string,
    clanCoins: number,
    members: number,
    name: string;
    color: string;
};


const clans: Clan[] = [
    { ranking: 1, clanMaster: "Leader1", clanCoins: 5000, members: 50, name: "Clan1", color: "rgba(218,165,32,0.89)" },
    { ranking: 2, clanMaster: "Leader2", clanCoins: 4000, members: 45, name: "Clan2", color: "rgba(192,192,192,0.75)" },
    { ranking: 3, clanMaster: "Leader3", clanCoins: 4000, members: 45, name: "Clan3", color: "rgb(162,108,62)" },
    { ranking: 4, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 5, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 6, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 7, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 8, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 9, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 10, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 11, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 12, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 13, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 14, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 15, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 16, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
    { ranking: 17, clanMaster: "Leader4", clanCoins: 4000, members: 45, name: "Clan4", color: "rgba(0,0,0,0.6)" },
];


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


export const AllClansView = () => {
    const { isMobileSize } = useIsMobileSize();

    return (
        <>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>KLAANIT</h1>
            {isMobileSize ? <ClansViewMobile /> : <ClansViewDesktop />}
        </>
    );
};

export const AddClanView = () => (
    <>
    <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Luo Klaani</h1>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>
     <div>lorem</div>

    </>


);

export const OpenClanView = () => <div>Clan view</div>;



const ClansViewMobile = () => {
    return  (
        <>
            {clans.map((clan, idx) => (
            <div key={idx} className={cls.ClanCard} style={{ backgroundColor: clan.color }}>
                <div><strong>Sijoitus:</strong> {clan.ranking}</div>
                <div><strong>Klaani:</strong> {clan.name}</div>
                <div><strong>Mestari:</strong> {clan.clanMaster}</div>
                <div><strong>Kolikot:</strong> {clan.clanCoins}</div>
                <div><strong>Jäsenet:</strong> {clan.members}</div>
            </div>
        ))
            }
        </>
    )
}


const ClansViewDesktop = () => {
    return (
        <table className={cls.ClanTable}>
            <thead>
            <tr>
                <th>Sijoitus</th>
                <th>Klaani</th>
                <th>Mestari </th>
                <th>Kolikot</th>
                <th>Jäsenet</th>
            </tr>
            </thead>
            <tbody>
            {clans.map((clan, idx) => (
                <tr key={idx} style={{ backgroundColor: clan.color }}>
                    <td>{clan.ranking}</td>
                    <td>{clan.name}</td>
                    <td>{clan.clanMaster}</td>
                    <td>{clan.clanCoins}</td>
                    <td>{clan.members}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}


export default ClanMainPage;