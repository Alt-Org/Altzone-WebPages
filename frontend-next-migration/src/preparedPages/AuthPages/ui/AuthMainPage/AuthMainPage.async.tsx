import dynamic from 'next/dynamic';

export const AuthMainPageAsync = dynamic(() => import('./AuthMainPage'));
