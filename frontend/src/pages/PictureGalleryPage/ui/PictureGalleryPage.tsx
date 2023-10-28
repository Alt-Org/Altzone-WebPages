import {Navbar} from "@/widgets/Navbar";
import {Container} from "@/shared/ui/Container";
import cls from "./PictureGalleryPage.module.scss";
import {GalleryCategoriesWithModalSlider} from "@/shared/ui/GalleryCategoriesWithModalSlider";
import {categories} from "../model";
// import {useDispatch} from "react-redux";
// import {useEffect} from "react";
// import {galleryApi} from "@/entities/Gallery";

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



// Получаем список директорий
// const directories = await dispatch(
//     // @ts-ignore
//     galleryApi.endpoints.getDirectories.initiate({ parentDirectory: 'comics' })
// );
//
// console.log(directories);

// const photoPromises = directories.data.map(directory =>
//     dispatch(galleryApi.endpoints.getPhotosInDirectory.initiate({
//         parentDirectory: 'someParent',
//         directoryName: directory.name
//     }))
// );

// const allPhotos = await Promise.all(photoPromises);

// const dispatch = useDispatch();
//
// useEffect(() => {
//     (async () => {
//         try {
//             const response = await fetch("https://altzone.fi/public/site/comics");
//             const data = await response.json();
//             console.log(data);
//         } catch (e) {
//             console.log("fuck")
//             console.log(e);
//         }
//     })();
// }, []);


// useEffect(() => {
//     // async function fetchData() {
//     //     try {
//     //         const response = await fetch("https://altzone.fi/public/site/comics");
//     //         const data = await response.json();
//     //         console.log(data);
//     //     }
//     //     catch (e) {
//     //         console.log(e);
//     //     }
//     // }
//
//     const fetchData = async () => {
//         // get the data from the api
//         const data = await fetch(`https://altzone.fi/public/site/comics`);
//         // convert the data to json
//         const json = await data.json();
//
//         console.log(json);
//
//
//     }
//
//
//     fetchData();
// }, []);



// useEffect(() => {
//     fetch("https://altzone.fi/public/site/comics")
//         .then(response => response.json())
//         // 4. Setting *dogImage* to the image url that we received from the response above
//         .then(data => console.log(data))
// },[])
