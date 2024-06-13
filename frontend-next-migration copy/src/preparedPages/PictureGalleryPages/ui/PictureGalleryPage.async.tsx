import dynamic from 'next/dynamic';

const PictureGalleryPage = dynamic(() => import('./PictureGalleryPage'));

export default PictureGalleryPage;

