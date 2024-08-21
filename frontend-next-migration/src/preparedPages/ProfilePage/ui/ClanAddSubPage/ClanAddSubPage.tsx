
import cls from "./ClanAddSubPage.module.scss";
import { useDeleteProfile } from "@/features/DeleteProfile";
import Head from "next/head";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";

const ClanAddSubPage = () => {
    const { handleDelete } = useDeleteProfile();

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
            <h1>Profile Deletion</h1>
            <Button
                onClick={() => { handleDelete() }}
                theme={ButtonTheme.Graffiti}
                size={ButtonSize.M}
                className={cls.BtnGame}
                square={false}
            >Delete Profile
            </Button>
        </div>
    );
};

export default ClanAddSubPage;
