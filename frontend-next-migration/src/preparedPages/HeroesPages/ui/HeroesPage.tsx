import { FeedbackSideButton } from "@/features/FeedbackByExternalSource";
import cls from "./HeroPage.module.scss"
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import { SectionHeroesBlocks } from "@/widgets/SectionHeroesBlocks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";



const HeroesPage = () => {

    const sameBg = undefined;

    return (
        <>
        <div className={cls.main}>
            <FeedbackSideButton disableMobile={true} />
            <SectionHeroesBlocks
                backgroundImageSrc={sameBg}
            />
            <HorizontalLines/>
            <SectionHeroesBlocks
                backgroundImageSrc={sameBg}
            />
            <HorizontalLines/>
        </div>
        </>
    );
};

export default withBackgroundImage({
    alt: "ClassifiedHeroesPage underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
    // @ts-ignore
})(HeroesPage);

// export default GameArtPage;
