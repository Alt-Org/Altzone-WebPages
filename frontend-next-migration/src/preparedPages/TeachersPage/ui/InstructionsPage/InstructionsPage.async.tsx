import dynamic from 'next/dynamic';
import { Props } from './InstructionsPage';

const PictureGalleryPage = dynamic<Props>(() => import('./InstructionsPage'));

export default PictureGalleryPage;
