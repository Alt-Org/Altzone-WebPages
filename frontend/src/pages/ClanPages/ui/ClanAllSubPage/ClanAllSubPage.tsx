import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import cls from "./ClanAllSubPage.module.scss";
import {IClan, useGetClansQuery} from "@/entities/Clan";
import {Loader} from "@/shared/ui/Loader";


export const ClanAllSubPage = () => {
    const { isMobileSize } = useIsMobileSize();


    const { data: clans, error, isLoading } = useGetClansQuery({});

    if (isLoading) return <Loader className={cls.Loader}/>


    if (error) return <div>Error: {JSON.stringify(error)}</div>;


    if(clans){
        return (
            <>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>KLAANIT</h1>
                {isMobileSize ? <ClansViewMobile clans={clans} /> : <ClansViewDesktop clans={clans} />}
            </>
        );
    }

    return null;


};


type MobileProps = {
    clans : IClan[]
}



const ClansViewMobile = ({ clans }: MobileProps) => {
    return (
        <>
            {clans.map((clan, idx) => {
                let bgColor;
                switch (idx) {
                    case 0:
                        bgColor = 'rgba(218,165,32,0.89)';
                        break;
                    case 1:
                        bgColor = 'rgba(192,192,192,0.75)';
                        break;
                    case 2:
                        bgColor = 'rgb(162,108,62)';
                        break;
                    default:
                        bgColor = 'rgba(0,0,0,0.6)';
                        break;
                }
                return (
                    <div key={idx} className={cls.ClanCard}
                         style={{ backgroundColor: bgColor }}
                    >
                        <div><strong>Sijoitus:</strong> {idx + 1}</div>
                        <div><strong>Klaani:</strong> {clan.name}</div>
                        <div><strong>Kolikot:</strong> {clan.gameCoins}</div>
                        <div><strong>Tagi:</strong> {clan.tag}</div>
                        <div><strong>Jäsenet:</strong> {50}</div>
                        <div><strong>Mestari:</strong> Joku Mestari {idx +1}</div>
                    </div>
                );
            })}
        </>
    )
}


type DesktopProps = {
    clans : IClan[]
}

const ClansViewDesktop = ({ clans }: DesktopProps) => {
    return (
        <table className={cls.ClanTable}>
            <thead>
            <tr>
                <th>Sijoitus</th>
                <th>Klaani</th>
                <th>Mestari </th>
                <th>Kolikot</th>
                <th>Jäsenet</th>
                <th>Tagi</th>
            </tr>
            </thead>
            <tbody>
            {clans.map((clan, idx) => {
                let bgColor;
                switch (idx) {
                    case 0:
                        bgColor = 'rgba(218,165,32,0.89)';
                        break;
                    case 1:
                        bgColor = 'rgba(192,192,192,0.75)';
                        break;
                    case 2:
                        bgColor = 'rgb(162,108,62)';
                        break;
                    default:
                        bgColor = 'rgba(0,0,0,0.6)';
                        break;
                }

                return (
                    <tr key={idx} style={{ backgroundColor: bgColor }}>
                        <td>{idx + 1}</td>
                        <td>{clan.name}</td>
                        <td>Joku Mestari {idx + 1}</td> {/* Assuming we don't have clan master data and using placeholder */}
                        <td>{clan.gameCoins}</td>
                        <td>{50}</td>  {/* Assuming we don't have members data and using placeholder */}
                        <td>{clan.tag}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}
