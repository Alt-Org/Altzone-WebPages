import dynamic from 'next/dynamic';
import { Props } from './PrivacyPage';

export const PrivacyPageAsync = dynamic<Props>(() => import('./PrivacyPage'));
