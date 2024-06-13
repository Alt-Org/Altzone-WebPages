import dynamic from 'next/dynamic';

const NewsElementPageAsync = dynamic(() => import('./NewsElementPage'));

export default NewsElementPageAsync;