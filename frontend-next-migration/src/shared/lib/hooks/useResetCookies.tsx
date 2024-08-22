import { useCallback } from 'react';
import { Cookies } from 'react-cookie';

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
