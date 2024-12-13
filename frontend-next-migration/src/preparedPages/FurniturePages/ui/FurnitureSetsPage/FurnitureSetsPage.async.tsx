import dynamic from 'next/dynamic';

const FurnitureSetsPageAsync = dynamic(() => import('./FurnitureSetsPage'));

export default FurnitureSetsPageAsync;
