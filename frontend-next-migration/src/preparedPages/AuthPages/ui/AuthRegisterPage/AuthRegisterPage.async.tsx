import dynamic from 'next/dynamic';

export const AuthRegisterPageAsync = dynamic(() => import('./AuthRegisterPage'));
