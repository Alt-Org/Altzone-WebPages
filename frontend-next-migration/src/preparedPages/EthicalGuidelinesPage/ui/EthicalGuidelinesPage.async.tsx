import dynamic from 'next/dynamic';
import { Props } from './EthicalGuidelinesPage';

export const EthicalGuidelinesPageAsync = dynamic<Props>(() => import('./EthicalGuidelinesPage'));
