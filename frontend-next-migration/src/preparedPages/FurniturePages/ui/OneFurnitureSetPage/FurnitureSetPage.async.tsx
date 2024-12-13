import dynamic from 'next/dynamic';

const FurnitureSetPageAsync = dynamic(() => import('./FurnitureSetPage'));

export default FurnitureSetPageAsync;
