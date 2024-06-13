import {jwtDecode} from "jwt-decode";

export function getJwtExpTimeStamp(token: string) {
    const decoded = jwtDecode(token);
    // @ts-ignore
    return decoded?.exp as number;
}