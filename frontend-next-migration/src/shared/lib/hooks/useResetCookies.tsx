import { useCallback } from 'react';
import { Cookies } from 'react-cookie';

/**
 * Custom hook to reset all cookies and local storage, then reload the page.
 *
 * @returns Callback function to reset cookies and reload the page.
 *
 * @example
 * const handleResetCookies = useResetCookies();
 *
 * return (
 *   <button onClick={handleResetCookies}>Reset Cookies</button>
 * );
 */
export const useResetCookies = () => {
    return useCallback(() => {
        const cookies = new Cookies();

        const allCookies = cookies.getAll();
        Object.keys(allCookies).forEach((cookieName) => {
            cookies.remove(cookieName, { path: '/' });
        });

        window.localStorage.clear();
        window.location.reload();
    }, []);
};
