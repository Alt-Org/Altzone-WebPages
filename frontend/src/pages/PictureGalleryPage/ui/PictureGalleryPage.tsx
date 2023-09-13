import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import {GalleryCategoriesWithModalSlider} from "@/shared/ui/GalleryCategoriesWithModalSlider";
import {categories} from "../model";

const PictureGalleryPage = () => {


    return (
       <div className={cls.Wrapper}>
           <Navbar   className={cls.Navbar}/>
           <Container fluid={true}>
               <div style={{display: "flex ", gap: "30px", justifyContent: "center" , flexWrap: "wrap"}}>
                   {
                       categories.map((category) => (
                           <GalleryCategoriesWithModalSlider
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