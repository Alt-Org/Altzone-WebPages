import {ComponentType} from "react";
import {Navbar} from "@/widgets/Navbar";
import cls from "./ClanMainPage.module.scss";
import {Container} from "@/shared/ui/Container";


type Props = {
    HasOutletChildren: ComponentType;
}

const ClanMainPage = ({HasOutletChildren}: Props) => {
    return (
        <div className={cls.Wrapper}>

            <Navbar key={"navbarPictureGallery"}  className={cls.Navbar}/>

            <Container className={cls.Container}>
                <div style={{width: "50px", height: "50px" , background: "red"}}>
                    lol
                </div>
                <div style={{width: "50px", height: "50px" , background: "red"}}>
                    lol
                </div>

                <div style={{width: "50px", height: "50px" , background: "red"}}>
                    lol
                </div>
            </Container>
            <HasOutletChildren/>
        </div>
    )
}


export default ClanMainPage;