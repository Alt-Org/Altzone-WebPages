import {Button, ButtonTheme} from "@/shared/ui/Button/Button";
import {useNavigate} from "react-router-dom";
import cls from "./SwitchButton.module.scss"

type Props = {
    navigateTo : string;
}

export const SwitchButton = ({navigateTo}: Props) => {

    const navigate = useNavigate()

    return (
        <Button className={cls.Button} type={"button"}  onClick={()=> navigate(navigateTo)} theme={ButtonTheme.Graffiti}>
        </Button>
    )
}