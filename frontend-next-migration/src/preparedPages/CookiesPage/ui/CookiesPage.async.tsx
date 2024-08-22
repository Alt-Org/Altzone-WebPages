import dynamic from 'next/dynamic';
import { Props } from './CookiesPage';

export const CookiesPageAsync = dynamic<Props>(() => import('./CookiesPage'));
