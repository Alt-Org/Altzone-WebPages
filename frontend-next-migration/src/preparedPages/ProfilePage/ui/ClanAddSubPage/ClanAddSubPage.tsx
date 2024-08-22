
import cls from "./ClanAddSubPage.module.scss";
import { useDeleteProfile } from "@/features/DeleteProfile";
import Head from "next/head";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { useClientTranslation } from "@/shared/i18n";
import { useParams } from "next/navigation";


const ClanAddSubPage = () => {
    const { handleDelete } = useDeleteProfile();
    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "clan");
    return (
        <div className={cls.ClanAddSubPage}>
            <Head>
                <title>Profile</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <link rel="canonical" href={""} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="" />
                <meta property="og:description" content="" />
                <meta property="og:url" content={""} />
            </Head>
            <div className={cls.container}>
                <div className={cls.div1}>
                    <h1>Profile Deletion</h1>
                </div>
                <div className={cls.div2}>
                    <p>{t('profile-deletion')}</p>
                </div>
                <div className={cls.div3}>
                    <p>{t('profile-deletion-info')}</p>
                </div>
            </div>
        </div>
    );
};

export default ClanAddSubPage;
