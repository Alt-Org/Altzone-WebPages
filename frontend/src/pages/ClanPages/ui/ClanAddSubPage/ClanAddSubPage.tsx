import {NewClanForm} from "@/features/AddNewClan";
import cls from "./ClanAddSubPage.module.scss";

const ClanAddSubPage = () => (
    <div className={cls.ClanAddSubPage}>
        <NewClanForm onSuccess={()=> console.log()} className={cls.NewClanForm}/>
    </div>
);

export default ClanAddSubPage;
