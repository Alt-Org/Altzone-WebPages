import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import {GalleriasSection} from "@/widgets/GalleriasSection";


const PictureGalleryPage = () => {
    return (
       <div className={cls.Wrapper}>
           <Navbar className={cls.Navbar}/>
           <Container  className={cls.Container}>
               <h1>Kuvagalleriat</h1>
               <GalleriasSection parentDirectory={"artGalleries"}/>
           </Container>
       </div>
   )
}

export default PictureGalleryPage;

