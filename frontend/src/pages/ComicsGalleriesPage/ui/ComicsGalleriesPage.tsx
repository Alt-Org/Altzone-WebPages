import cls from "./ComicsGalleriesPage.module.scss";
import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import {GalleriasSection} from "@/widgets/GalleriasSection";

const ComicsGalleriesPage = () => {
    return (
        <div className={cls.Wrapper}>
            <Navbar key={"navbarPictureGallery"} className={cls.Navbar}/>
            <Container className={cls.Container}>
                <h1>Sarjakuvat</h1>
                <GalleriasSection parentDirectory={"comics"}/>
            </Container>
        </div>
    )
}

export default ComicsGalleriesPage;