import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import {GalleryCategoriesWithModalSlider} from "@/shared/ui/GalleryCategoriesWithModalSlider";

const galleryCatPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/cats/*', { eager: true, as: 'url' }));
const galleryDogsPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/dogs/*', { eager: true, as: 'url' }));
const galleryZooPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/zoo/*', { eager: true, as: 'url' }));
const galleryCartoonsPaths = Object.values(import.meta.glob('@/shared/assets/images/gallery/cartoons/*', { eager: true, as: 'url' }));

const PictureGalleryPage = () => {
    return (
       <div className={cls.Wrapper}>
           <Navbar   className={cls.Navbar}/>
           <Container fluid={true}>
               <div style={{display: "flex ", gap: "30px", justifyContent: "center" , flexWrap: "wrap"}}>
                   <GalleryCategoriesWithModalSlider
                       key={"Cats"}
                       sources={galleryCatPaths}
                       title={"Kissat"}
                   />
                   <GalleryCategoriesWithModalSlider
                       key={"Dogs"}
                       sources={galleryDogsPaths}
                       title={"Koirat"}
                   />

                   <GalleryCategoriesWithModalSlider
                       key={"Zoo"}
                       sources={galleryZooPaths}
                       title={"Zoo"}
                   />

                   <GalleryCategoriesWithModalSlider
                       key={"Sarjakuvat"}
                       sources={galleryCartoonsPaths}
                       title={"Sarjakuvat"}
                   />

                   <GalleryCategoriesWithModalSlider
                       key={"Dogs3"}
                       sources={galleryDogsPaths}
                       title={"Koirat"}
                   />

               </div>
           </Container>
           <br/>
       </div>
   )
}

export default PictureGalleryPage;