import {useNavigate } from "react-router-dom";
import {ComponentType, useCallback} from "react";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {Modal} from "@/shared/ui/Modal";
import {LoginForm} from "@/features/AuthByUsername";

type Props = {
    HasOutletChildren: ComponentType;
}

const AuthSubLoginPage = ({HasOutletChildren}: Props) => {
    const navigate = useNavigate();

    const navigateToForgottenPwPage = useCallback(() => {
        navigate(RoutePaths.auth_login_fpw);
    }, [navigate]);

    const navigateToRegisterPage = useCallback(() => {
        navigate(RoutePaths.auth_register);
    }, [navigate]);

    return (
        <>
            <Modal
                isOpen={true}
                onRequestClose={
                    ()=> console.log("something...")
                }
            >
                <LoginForm/>
            </Modal>
            <HasOutletChildren/>
        </>
    );
}

export default AuthSubLoginPage;
