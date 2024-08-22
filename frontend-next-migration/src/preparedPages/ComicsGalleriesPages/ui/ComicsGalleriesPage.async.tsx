import dynamic from 'next/dynamic';
import {Props} from "./ComicsGalleriesPage";

const ComicsGalleriesPageAsync = dynamic<Props>(() => import('./ComicsGalleriesPage'));


export default ComicsGalleriesPageAsync;
