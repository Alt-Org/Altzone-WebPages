import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {RegisterForm} from "@/features/AuthByUsername";
import {Modal} from "@/shared/ui/Modal";


const AuthSubRegisterPage = () => {
    return (
        <>
            <Modal
                isOpen={true}
            >
           <RegisterForm toLoginPage={RoutePaths.auth_login} />
            </Modal>
        </>
    );
}

export default AuthSubRegisterPage;
