import {memo, useEffect, useRef, useState} from "react";
import cls from "./styles.module.scss";
import {FsLightboxFixed} from "./FsLightboxFixed";


export type GalleryCategoriesWithModalSliderProps = {
    title: string,
    followLastImage?: boolean;
    sources : string[],
    cover : { name : string, url: string}
}

export const GalleryCategoriesWithModalSlider = memo(({title, sources, followLastImage = false, cover}: GalleryCategoriesWithModalSliderProps) => {
    const [toggler, setToggler] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<any>();
    const getCurrentIndexByRef = (ref: any) => ref.current.stageIndexes.current as number;

    const [sourceIndex, setSourceIndex] = useState(0);

    // This code block fixes a slider library bug with scrollbar.
    // For more details, refer to the styles in index.scss.
    useEffect(() => {
        function cleanup() {
            window.document.body.classList.remove('FsLightbox');
        }
        if(isOpen){
            window.document.body.classList.add('FsLightbox');
        }
       else{
           cleanup()
        }
        return () =>{
            cleanup()
        }
    }, [isOpen]);


    useEffect(() => {
        if(isOpen){
            ref?.current?.elements?.container?.current?.classList?.remove('fslightbox-fade-in-strong');
        }
    }, [isOpen])



    return (
        <div style={{cursor: "pointer"}}>

            <div onClick={()=> setToggler(!toggler)} className={cls.cover}>
                <h2 className={cls.title}>{title}</h2>
                <img className={cls.categoryImg} src={cover.url} alt={cover.name}/>
            </div>

          <FsLightboxFixed
                    // UIFadeOutTime={1000}
                    disableSlideSwiping={true}
                    // zoomIncrement={1}
                    // onOpen={()=>setIsOpen(true)}
                    onClose={()=>{
                        if(ref && followLastImage){
                            const currentIndex = getCurrentIndexByRef(ref);
                            setSourceIndex(currentIndex);
                        }
                        setIsOpen(false)
                    }}
                    ref={ref}
                    // sourceIndex={sourceIndex}
                    loadOnlyCurrentSource={true}
                    toggler={toggler}
                    // sources={sources}
                    sources={sources.map((s=>{
                        return (
                            <div className={cls.sliderContainer}>

                                <img className={cls.sliderImg} src={s}/>

                            </div>

                        )
                    }))}
                />
        </div>
    )
})