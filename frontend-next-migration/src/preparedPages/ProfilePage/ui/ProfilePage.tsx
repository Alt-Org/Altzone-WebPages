import cls from "./ProfilePage.module.scss";
// //import { useDeleteProfile } from "@/features/DeleteProfile";
// import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { useClientTranslation } from "@/shared/i18n";
import { useParams } from "next/navigation";


type Props = {
    title: string;
    profileDeletionText: string;
    profileDeletionInfoText: string;
}

const ProfilePage = (props: Props) => {

    const {
        title,
        profileDeletionInfoText,
        profileDeletionText
    } = props;

    //const { handleDelete } = useDeleteProfile();
    const params = useParams();
    const lng = params.lng as string;
    const { t } = useClientTranslation(lng, "profile");
    return (
        <div className={cls.main}>
            <div className={cls.container}>
                <div className={cls.div1}>
                    <h1>
                        {title}
                    </h1>
                </div>
                <div className={cls.div2}>
                    <p>
                        {profileDeletionText}
                    </p>
                </div>
                <div className={cls.div3}>
                    <p>
                        {profileDeletionInfoText}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
