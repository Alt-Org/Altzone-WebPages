import { Navbar } from "@/widgets/Navbar";
import { FeedbackSideButton } from "@/features/FeedbackByExternalSource";
import { useServerTranslation } from "@/shared/i18n";
import cls from "./HeroPage.module.scss"
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import { SectionHeroesBlocks } from "@/widgets/SectionHeroesBlocks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";

type Props = {
    lng: string
}

const HeroesPage = async ({ lng }: Props) => {

    const { t } = await useServerTranslation(lng, 'heroes');
    const sameBg = undefined;

    return (
        <>
        <Navbar overlaid />
        <main className={cls.main}>
            <FeedbackSideButton disableMobile={true} />
            <SectionHeroesBlocks
                backgroundImageSrc={sameBg}
            />
            <HorizontalLines/>
            <SectionHeroesBlocks
                backgroundImageSrc={sameBg}
            />
            <HorizontalLines/>
        </main>
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
