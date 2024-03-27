import CustomCarousel from "@/shared/ui/CustomCarousel/ui/CustomCarousel";
import cls from "./SectionHeroes.module.scss";
import Heroes from "../../../features/HeroesInfo/model/heroes";
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";


const SectionHeroes = () => {
    return (
        <div className={cls.SectionHeroes}>
            <CustomCarousel className={cls.carouselWrapper}>

                {/*todo required markup instead*/}
                {Heroes.map((item) => (
                    <div key={item.id}>
                        {/*todo -> Image not working it is printing the alt*/}
                        <Image src={item.src} alt={item.alt} className={cls.img} width={200} height={300} /> 
                        <h2 className={cls.title}>{item.title}</h2>
                        <p className={cls.description}>{item.description}</p>
                    </div>
                ))}
            </CustomCarousel>


            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100}/>
            </div>
        </div>
    );
};

export default SectionHeroes;