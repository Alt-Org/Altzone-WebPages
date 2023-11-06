import dynamic from 'next/dynamic';

const ComicsGalleriesPageAsync = dynamic(() => import('./ComicsGalleriesPage'));


export default ComicsGalleriesPageAsync;
