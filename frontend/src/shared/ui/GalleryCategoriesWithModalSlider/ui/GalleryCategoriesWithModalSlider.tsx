import {memo, useEffect, useRef, useState} from "react";
import cls from "./styles.module.scss";
import {FsLightboxFixed} from "./FsLightboxFixed";


// const pdftest = import.meta.glob('@/shared/assets/pdf/altzone.pdf', { eager: true, as: '' })
// import pdfPath from "@/shared/assets/pdf/altzone.pdf";



type Props = {
    title: string,
    followLastImage?: boolean;
    sources : string[]
}

export const GalleryCategoriesWithModalSlider = memo(({title, sources, followLastImage = false}: Props) => {
    const [toggler, setToggler] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<any>();
    const getCurrentIndexByRef = (ref: any) => ref.current.stageIndexes.current as number;

    const [sourceIndex, setSourceIndex] = useState(0);

    // This code block fixes a slider library bug with scrollbar.
    // For more details, refer to the styles in index.scss.
    // useEffect(() => {
    //     function cleanup() {
    //         window.document.body.classList.remove('FsLightbox');
    //     }
    //     if(isOpen){
    //         window.document.body.classList.add('FsLightbox');
    //     }
    //    else{
    //        cleanup()
    //     }
    //     return () =>{
    //         cleanup()
    //     }
    // }, [isOpen]);


    // useEffect(() => {
    //     // if(isOpen){
    //         ref?.current?.elements?.container?.current?.classList?.remove('fslightbox-fade-in-strong');
    //     // }
    // }, [isOpen])



    return (
        <div style={{cursor: "pointer"}}>

            <div onClick={()=> setToggler(!toggler)}>
                <h2 className={cls.title}>{title}</h2>
                <img className={cls.categoryImg} src={sources[sourceIndex]} alt=""/>
            </div>

          <FsLightboxFixed
                    // UIFadeOutTime={1000}
                    disableSlideSwiping={true}
                    // zoomIncrement={1}
                    // onOpen={()=>setIsOpen(true)}
                    // onClose={()=>{
                    //     if(ref && followLastImage){
                    //         const currentIndex = getCurrentIndexByRef(ref);
                    //         setSourceIndex(currentIndex);
                    //     }
                    //     setIsOpen(false)
                    // }}


                    ref={ref}
                    // sourceIndex={sourceIndex}
                    // loadOnlyCurrentSource={true}
                    toggler={toggler}
                    // sources={sources}
                    sources={sources.map((s=>{
                        return (
                            <div className={cls.sliderContainer}>


                                <div className={cls.sliderText}>
                                Lorem ipsum dolor sit amet,
                                consectetur adipisicing elit.
                                At culpa debitis distinctio ducimus fugit nesciunt possimus,
                                ratione saepe. Amet autem deserunt earum exercitationem
                                fugiat hic illo maiores officiis tenetur voluptate.
                                    <a href="https://google.com">google</a>
                                </div>


                                <img className={cls.sliderImg} src={s}/>


                            </div>

                        )
                    }))}
                />
        </div>
    )
})