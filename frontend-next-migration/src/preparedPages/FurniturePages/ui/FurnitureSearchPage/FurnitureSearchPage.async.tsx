import dynamic from 'next/dynamic';

const FurnitureSearchPageAsync = dynamic(() => import('./FurnitureSearchPage'));

export default FurnitureSearchPageAsync;
