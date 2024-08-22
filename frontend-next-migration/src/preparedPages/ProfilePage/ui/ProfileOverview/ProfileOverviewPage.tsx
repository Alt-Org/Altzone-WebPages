
import cls from "./ProfileOverviewPage.module.scss";
//import { useDeleteProfile } from "@/features/DeleteProfile";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { useClientTranslation } from "@/shared/i18n";
import { useParams } from "next/navigation";


const PlayerOverviewPage = () => {
    //const { handleDelete } = useDeleteProfile();
    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "profile");
    return (
        <div className={cls.ClanAddSubPage}>
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

export default PlayerOverviewPage;
