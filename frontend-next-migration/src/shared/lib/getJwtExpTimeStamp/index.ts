import {jwtDecode} from "jwt-decode";

/**
 * Returns the expiration timestamp of a JWT token.
 *
 * @param {string} token - The JWT token to decode and retrieve the expiration timestamp from.
 * @return {number} - The expiration timestamp of the JWT token, or undefined if the token is malformed.
 *
 * @example
 * const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzUyMzkwMjJ9.kH1tx2R-cVE1bcHZSm3xBCDacosXsRuUkljbP6IhYVI";
 * const expiresAt = getJwtExpTimeStamp(token);
 * console.log(expiresAt); // 1635239022
 */
export function getJwtExpTimeStamp(token: string) {
    const decoded = jwtDecode(token);
    // @ts-ignore
    return decoded?.exp as number;
}