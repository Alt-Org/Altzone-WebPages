import FsLightbox from "fslightbox-react";
import {Navbar} from "@/widgets/Navbar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const PictureGalleryPage = () => {

    const navigate = useNavigate();

    const [toggler, setToggler] = useState(false);
    useEffect(()=>{
        setToggler(true)
    },[])

   return (
       <div style={{minHeight: "100vh"}}>
           <Navbar overlayed marginTop={20} />
           <FsLightbox
               onClose={()=>navigate(-1)}
               toggler={toggler}
               sources={[
                   'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8fA%3D%3D&w=1000&q=80',
                   'https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=0.670xw:1.00xh;0.167xw,0&resize=640:*',
                   'https://ichef.bbci.co.uk/news/1024/branded_news/16755/production/_126898919_catnewproject.jpg'
               ]}
           />
       </div>

   )
}

export default PictureGalleryPage;