import Image from "next/image";
import { Navbar } from "@/widgets/Navbar";

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

type Props = {
    lng: string
}

export function TempLayoutWithImages (props: Props) {

    const {lng} = props;

    // const params = useParams();
    // const lng = params.lng as string;

    const array =  new Array(9).fill(null);
    return (
        <div>
            <Navbar/>
            {array.map((_, index)=>(
                <ImageContainer key={index} imgSrc={`/images/GameArtTempLayoutImages/${lng}/slide${++index}.webp`} altText={`slide${++index}`} />
            ))}
        </div>
    )
}