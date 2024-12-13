import dynamic from 'next/dynamic';

const FurnitureCategoryPageAsync = dynamic(() => import('./FurnitureCategoryPage'));

export default FurnitureCategoryPageAsync;
