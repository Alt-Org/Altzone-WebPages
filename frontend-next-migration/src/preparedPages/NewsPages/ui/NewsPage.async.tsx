import dynamic from 'next/dynamic';

const NewsPageAsync = dynamic(() => import('./NewsPage'));

export default NewsPageAsync;
