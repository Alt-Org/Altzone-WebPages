"use client"
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import cls from "./ClanAllSubPage.module.scss";
import {GetClansResponse, useGetClansQuery} from "@/entities/Clan";
import {Loader} from "@/shared/ui/Loader";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {envHelper} from "@/shared/const/env/envHelper";
import Head from "next/head";


import {useParams, useRouter} from 'next/navigation';
import {useClientTranslation} from "@/shared/i18n";


const ClanAllSubPage = () => {


    const { isMobileSize } = useIsMobileSize();

    const router = useRouter();

    const { data: clans, error, isLoading } = useGetClansQuery({});

    if (isLoading) return <Loader className={cls.Loader}/>

    if (error) return <div>Error: {JSON.stringify(error)}</div>;


    const onClickToClan = (id: string) => {
        router.push(`${RoutePaths.clan}/${id}`);
    }

    if(clans){
        return (
            <>
                <Head>
                    <title>Klaanit</title>
                    <meta name="description" content="Selaa kaikkia klaaneja tai käy omassa klaanissasi. Luo uusi klaani, jos sinulla ei ole yhtä." />
                    <meta name="keywords" content="altzone, KLAANI, klaani, peli, klaani, peliyhteisö, luo klaani, liity klaaniin" />
                    <link rel="canonical" href={`${envHelper.appDomain}/${RoutePaths.clan_all}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Klaanit" />
                    <meta property="og:description" content="Selaa kaikkia klaaneja tai käy omassa klaanissasi. Luo uusi klaani, jos sinulla ei ole yhtä." />
                    <meta property="og:url" content={`${envHelper.appDomain}/${RoutePaths.clan_all}`} />
                </Head>
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>KLAANIT</h1>
                {isMobileSize
                    ?
                    <ClansViewMobile clanServerResponse={clans} onClickToClan={onClickToClan}/>
                    :
                    <ClansViewDesktop clanServerResponse={clans} onClickToClan={onClickToClan}/>}
            </>
        );
    }

    return null;


};


type MobileProps = {
    clanServerResponse : GetClansResponse;
    onClickToClan? : (id: string) => void;
}



const ClansViewMobile = ({ clanServerResponse, onClickToClan }: MobileProps) => {

    const onClick = (id: string) => {
        if(onClickToClan) onClickToClan(id);
    }

    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "clan");

    return (
        <>
            {clanServerResponse.data.Clan.map((clan, idx) => {
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
                         onClick={()=>onClick(clan?._id)}
                    >
                        <div><strong>{t('rating')}:</strong> {idx + 1}</div>
                        <div><strong>{t('clan')}:</strong> {clan?.name}</div>
                        <div><strong>{t('coins')}:</strong> {clan?.gameCoins}</div>
                        <div><strong>{t('tag')}:</strong> {clan?.tag}</div>
                        <div><strong>{t('members')}:</strong> {50}</div>
                        <div><strong>{t('clan_master')}:</strong> {t('some_master')} {idx +1}</div>
                    </div>
                );
            })}
        </>
    )
}


type DesktopProps = {
    clanServerResponse : GetClansResponse;
    onClickToClan? : (id: string) => void;
}

const ClansViewDesktop = ({ clanServerResponse, onClickToClan }: DesktopProps) => {


    const params = useParams();
    const lng = params.lng as string;
    const {t} = useClientTranslation(lng, "clan");

    const onClick = (id: string) => {
        if(onClickToClan) onClickToClan(id);
    }

    return (
        <table className={cls.ClanTable}>
            <thead>
            <tr>
                <th>{t('rating')}</th>
                <th>{t('clan')}</th>
                <th>{t('clan_master')}</th>
                <th>{t('coins')}</th>
                <th>{t('members')}</th>
                <th>{t('tag')}</th>
            </tr>
            </thead>
            <tbody>
            {clanServerResponse.data.Clan.map((clan, idx) => {
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
                    <tr key={idx} style={{ backgroundColor: bgColor }} onClick={()=>onClick(clan?._id)}>
                        <td>{idx + 1}</td>
                        <td>{clan?.name}</td>
                        <td>Joku Mestari </td>
                        <td>{clan?.gameCoins}</td>
                        <td>{clan?.playerCount}</td>
                        <td>{clan?.tag}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}


export default ClanAllSubPage;