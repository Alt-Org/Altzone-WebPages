import cls from './ProfilePage.module.scss';

// // //import { useDeleteProfile } from "@/features/DeleteProfile";
// // import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
export type Props = {
    title: string;
    profileDeletionText: string;
    profileDeletionInfoText: string;
};

const ProfilePage = ({ title, profileDeletionText, profileDeletionInfoText }: Props) => {
    // const { handleDelete } = useDeleteProfile();

    return (
        <main className={cls.main}>
            <div className={cls.container}>
                <h1>{title}</h1>
                <p>{profileDeletionText}</p>
                <p>{profileDeletionInfoText}</p>
            </div>
        </main>
    );
};

export default ProfilePage;
