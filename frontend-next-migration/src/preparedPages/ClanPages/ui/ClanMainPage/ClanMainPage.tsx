"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { NavbarClan } from "@/widgets/Navbar";
import { Container } from "@/shared/ui/Container";
import { selectProfile } from "@/entities/Auth";
import cls from "./ClanMainPage.module.scss";
import backgroundImage from "@/shared/assets/images/clanBg/Moon.webp"
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import { useParams } from "next/navigation";
import { useClientTranslation } from "@/shared/i18n";

const ClanMainPage = ({ children }: any) => {

    const user = useSelector(selectProfile);

    const [canShowAddNew, setCanShowAddNew] = useState(false);
    const [canShowUserClan, setShowUserClan] = useState(false);

    useEffect(() => {
        if (!user || !user.Player.clan_id) {
            setShowUserClan(false);
            // setCanShowAddNew(false);
            return;
        }

        setShowUserClan(true);
        setCanShowAddNew(false);

    }, [user]);

    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "clan");

    return (
        <div className={cls.Wrapper}>
            <NavbarClan className={cls.Navbar} />
            <Container className={cls.Container}>
                <div>
                    {/*<Link href={RoutePaths.CLAN_ALL}>{t('all_clans')}</Link>*/}
                    {/*canShowUserClan ? (<Link href={`${RoutePaths.clan}/${user?.Player.clan_id}`}>{t('my_clan')}</Link>) : (<p>Et ole liittynyt klaaniin <Link href={RoutePaths.clan_add_new}>{t('Luo oma klaani tästä')}</Link> tai liity klaaniin tästä!</p>)*/}
                    {/*{canShowAddNew && <Link href={RoutePaths.clan_add_new}>{t('create_clan')}</Link>}*/}
                </div>
                <div className={cls.ClansViewMain}>
                    {children}
                </div>
            </Container>

        </div>
    );
};

export default withBackgroundImage({
    alt: "Clan-Page Japan sakura style background",
    imagePath: backgroundImage as unknown as string,
})(ClanMainPage);
