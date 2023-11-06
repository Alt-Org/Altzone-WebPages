import dynamic from 'next/dynamic';

const PictureGalleryPage = dynamic(() => import('./PictureGalleryPage'));


export default PictureGalleryPage;

// const PictureGalleryPage = dynamic(
//     () => import('./PictureGalleryPage'),
//     { ssr: false }
// );

// import PictureGalleryPageSync from "./PictureGalleryPage"
//
//
// export async function getStaticProps() {
//     return {
//         props: {},
//     };
// }

