import { useSelector } from 'react-redux';
import { StateSchema } from "@/app/providers/StoreProvider";
import {userPermissions,UserPermissions} from "./userPermissions";

export const useUserPermissions = () => {
    const state = useSelector((state: StateSchema) => state);

    const canI = (permission: UserPermissions) => {
        const check = userPermissions[permission];
        return check ? check(state) : false;
    };

    return {canI};
}
