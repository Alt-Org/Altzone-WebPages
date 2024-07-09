import dynamic from 'next/dynamic';
import { Props } from './GameArtPage';

export const GameArtPageAsync = dynamic<Props>(() => import('./GameArtPage'));
