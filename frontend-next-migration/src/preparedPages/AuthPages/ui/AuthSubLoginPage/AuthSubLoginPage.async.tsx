import dynamic from 'next/dynamic';

export const AuthSubLoginPageAsync = dynamic(() => import('./AuthSubLoginPage'));
