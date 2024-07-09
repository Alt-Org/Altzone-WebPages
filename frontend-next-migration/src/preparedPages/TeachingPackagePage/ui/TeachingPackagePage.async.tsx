import dynamic from 'next/dynamic';
import { Props } from './TeachingPackagePage';

export const TeachingPackagePageAsync = dynamic<Props>(() => import('./TeachingPackagePage'));


