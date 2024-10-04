import dynamic from 'next/dynamic';
import { Props } from './ComingPage';

export const ComingPageAsync = dynamic<Props>(() => import('./ComingPage'));
