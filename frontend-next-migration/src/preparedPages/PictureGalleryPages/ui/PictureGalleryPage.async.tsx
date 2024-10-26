import dynamic from 'next/dynamic';
import { Props } from './PictureGalleryPage';

const PictureGalleryPage = dynamic<Props>(() => import('./PictureGalleryPage'));

export default PictureGalleryPage;
