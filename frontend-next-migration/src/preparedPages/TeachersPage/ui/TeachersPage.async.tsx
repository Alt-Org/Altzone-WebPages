import dynamic from 'next/dynamic';
import { Props } from './TeachersPage';

const TeachersPageAsync = dynamic<Props>(() => import('./TeachersPage'));

export default TeachersPageAsync;
