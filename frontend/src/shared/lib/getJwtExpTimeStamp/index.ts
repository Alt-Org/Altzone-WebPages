import jwt_decode from "jwt-decode";

export function getJwtExpTimeStamp(token: string) {
    const decoded = jwt_decode(token);
    // @ts-ignore
    return decoded?.exp as number;
}