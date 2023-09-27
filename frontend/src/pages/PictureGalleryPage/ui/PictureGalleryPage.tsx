import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import {GalleryCategoriesWithModalSlider} from "@/shared/ui/GalleryCategoriesWithModalSlider";
import {categories} from "../model";

const PictureGalleryPage = () => {


    return (
       <div className={cls.Wrapper}>
           <Navbar key={"navbarPictureGallery"} className={cls.Navbar}/>
           <Container fluid={true} className={cls.Container}>
               <div className={cls.galleries}>
                   {
                       categories.map((category) => (
                           <GalleryCategoriesWithModalSlider
                               followLastImage={category.followLastImage}
                               key={category.key}
                               sources={category.sources}
                               title={category.title}
                           />
                       ))
                   }
               </div>
           </Container>
           <br/>
       </div>
   )
}

export default PictureGalleryPage;