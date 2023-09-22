import { useNavigate } from "react-router-dom";
import {useCallback } from "react";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {RegisterForm} from "@/features/AuthByUsername";
import {Modal} from "@/shared/ui/Modal";


const AuthSubRegisterPage = () => {
    const navigate = useNavigate();
    const navigateToLoginPage = useCallback(() => {
        navigate(RoutePaths.auth_login);
    }, [navigate]);

    return (
        <>
            <Modal
                isOpen={true}
                onRequestClose={
                    ()=> console.log("something...")
                }
            >
           <RegisterForm/>
            </Modal>
        </>
    );
}

export default AuthSubRegisterPage;
