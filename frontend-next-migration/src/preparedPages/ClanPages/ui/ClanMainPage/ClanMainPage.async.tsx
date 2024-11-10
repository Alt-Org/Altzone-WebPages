import dynamic from 'next/dynamic';

export const ClanMainPageAsync = dynamic(() => import('./ClanMainPage'));
