import FsLightbox from "fslightbox-react";
import {Navbar} from "@/widgets/Navbar";

const PictureGalleryPage = () => {
   return (
       <div style={{minHeight: "100vh"}}>
           <Navbar overlayed marginTop={20} />
       </div>
       // <FsLightbox
       //     toggler={true}
       //     sources={[
       //         'https://i.imgur.com/fsyrScY.jpg',
       //         'https://www.youtube.com/watch?v=3nQNiWdeH2Q',
       //         'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
       //     ]}
       // />
   )
}

export default PictureGalleryPage;