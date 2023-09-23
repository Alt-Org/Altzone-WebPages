import {ComponentType} from "react";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {Modal} from "@/shared/ui/Modal";
import {LoginForm} from "@/features/AuthByUsername";

type Props = {
    HasOutletChildren: ComponentType;
}

const AuthSubLoginPage = ({HasOutletChildren}: Props) => {
    return (
        <>
            <Modal
                isOpen={true}
            >
                <LoginForm toForgottenPwPage={""} toRegisterPage={RoutePaths.auth_register}/>
            </Modal>
            <HasOutletChildren/>
        </>
    );
}

export default AuthSubLoginPage;
