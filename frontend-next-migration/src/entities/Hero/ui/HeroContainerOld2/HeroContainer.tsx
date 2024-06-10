'use client'
import {RefObject, useEffect, useRef, useState} from 'react';
import bgBox from "@/shared/assets/images/heros/hero-container/readyContainer.png";
import Image from 'next/image';
import cls from "./HeroContainer.module.scss";

type Props = {
    heroImg: string,
    heroDescription: string,
    heroColor: string,
}

const HeroContainer = (props: Props) => {
    const {
        heroImg,
        heroDescription,
        heroColor
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [distanceToBottom, setDistanceToBottom] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const calculateDistance = (
        containerRef:  RefObject<HTMLDivElement>,
        imageRef:  RefObject<HTMLDivElement>,
    ) => {
        if (containerRef.current && imageRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const imageRect = imageRef.current.getBoundingClientRect();
            const distanceToBottom = containerRect.bottom - imageRect.bottom;
            setDistanceToBottom(distanceToBottom);
        }
    };

    const handleImageLoad = () => {
        if (containerRef.current && imageRef.current) {
            setImagesLoaded(true);
        }
    };

    useEffect(() => {
        if (imagesLoaded) {
            calculateDistance(
                containerRef,
                imageRef
            );
        }
    }, [imagesLoaded]);

    useEffect(() => {
        const handleResize = () => calculateDistance(containerRef, imageRef);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={cls.wrapper}>
            <div className={cls.container} ref={containerRef}>
                <Image className={cls.bgImg} src={bgBox} alt="hero" width={400} height={400} onLoad={handleImageLoad} />
                <div className={cls.contentWrapper}>
                    <div className={cls.content}>
                        <div className={cls.heroImgWrapper} style={{backgroundColor: heroColor}}>
                            <Image
                                className={cls.heroImg}
                                src={heroImg}
                                alt="hero"
                                width={500}
                                height={500}
                                ref={imageRef}
                                onLoad={handleImageLoad}
                            />
                        </div>
                        <div className={cls.heroDescription} style={{maxHeight: distanceToBottom}}>
                            <p>
                                {/*todo delete after testing*/}
                                {heroDescription}
                                {heroDescription}
                                {heroDescription}
                                {heroDescription}
                                {heroDescription}
                                {heroDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HeroContainer;
