import dynamic from 'next/dynamic';
import { FurnitureOneSetPageProps } from './OneSetPage';

const OneSetPageAsync = dynamic<FurnitureOneSetPageProps>(() => import('./OneSetPage'));

export default OneSetPageAsync;
