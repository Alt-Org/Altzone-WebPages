import {NewClanForm} from "@/features/AddNewClan";
import cls from "./ClanAddSubPage.module.scss";

export const ClanAddSubPage = () => (
    <div className={cls.AddClanViewPage}>
    {/*<div className={cls.AddClanViewPage}>*/}

        <NewClanForm onSuccess={()=> console.log()} className={cls.NewClanForm}/>

    </div>
);
