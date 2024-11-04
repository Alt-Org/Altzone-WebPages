import dynamic from 'next/dynamic';

export const AuthLoginPageAsync = dynamic(() => import('./AuthLoginPage'));
