import {ComponentType} from "react";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {Modal} from "@/shared/ui/Modal";
import {LoginForm} from "@/features/AuthByUsername";
import {useNavigate} from "react-router-dom";

type Props = {
    HasOutletChildren: ComponentType;
}

const AuthSubLoginPage = ({HasOutletChildren}: Props) => {

    const navigate = useNavigate()

    return (
        <>
            <Modal
                isOpen={true}
            >
                <LoginForm
                    toForgottenPwPage={""}
                    toRegisterPage={RoutePaths.auth_register}
                    onSuccessLogin={()=> navigate(RoutePaths.MAIN)}
                />
            </Modal>
            <HasOutletChildren/>
        </>
    );
}

export default AuthSubLoginPage;
