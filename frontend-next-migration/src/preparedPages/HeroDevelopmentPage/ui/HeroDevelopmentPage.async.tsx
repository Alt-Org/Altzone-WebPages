import dynamic from 'next/dynamic';
import { HeroDevelopmentPageProps as Props } from './HeroDevelopmentPage';

export const HeroDevelopmentPageAsync = dynamic<Props>(() => import('./HeroDevelopmentPage'));
