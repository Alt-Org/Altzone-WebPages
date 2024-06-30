'use client'
import Link from 'next/link';
import { RoutePaths } from "@/shared/appLinks/RoutePaths";
import {useClientTranslation} from "@/shared/i18n";
import {useParams} from "next/navigation";

export default function NotFound() {

    const {lng} = useParams();

    const {t} =  useClientTranslation(lng as string, 'heroes');

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            textAlign: "center"
        }}>
            <h1>
                {t("not-found-title")}
            </h1>
            <Link href={RoutePaths.HEROES}>
                <b>
                    {t("not-found-check-heroes")}
                </b>
            </Link>
        </div>
    );
}
