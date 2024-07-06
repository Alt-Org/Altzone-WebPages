import dynamic from 'next/dynamic';
import {Props} from "./MainPage";

export const MainPage = dynamic<Props>(() => import('./MainPage'));

