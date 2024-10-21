import dynamic from 'next/dynamic';
import { Props } from './HeroDevelopmentPage';

export const HeroDevelopmentPageAsync = dynamic<Props>(() => import('./HeroDevelopmentPage'));
