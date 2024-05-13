'use client'
import {Navbar} from "@/widgets/Navbar";
import {useParams} from "next/navigation";
import Image from "next/image";


type ImageContainerProps = {
  imgSrc: string;
  altText: string;
}

function ImageContainer(props : ImageContainerProps) {
    const {imgSrc} = props;
    return (
        <Image width={4000} height={2250} quality={60} src={imgSrc} style={{width: "100vw"}} alt={"image"}/>
    )
}


export function TempLayoutWithImages () {

    const params = useParams();
    const lng = params.lng as string;

    const array =  new Array(15).fill(null);
    return (
        <div>
            <Navbar/>
            {array.map((_, index)=>(
                <ImageContainer key={index} imgSrc={`/images/TeachingPackageTempLayoutImages/${lng}/slide${++index}.png`} altText={`slide${++index}`} />
            ))}
        </div>
    )
}