import { memo, useCallback } from "react";
import Fancybox from "@/shared/ui/Fancybox/Fancybox";
import cls from "./styles.module.scss"
import Image from "next/image";
import { useClientTranslation } from "@/shared/i18n";

export type GalleryCategoriesWithModalSliderProps = {
    title: string;
    followLastImage?: boolean;
    sources: string[];
    cover: { name: string, url: string };
};

export const GalleryCategoriesWithModalSlider = memo(({
    title,
    sources,
    followLastImage = false,
    cover
}: GalleryCategoriesWithModalSliderProps) => {




    const getSortedSources = useCallback((sources: string[]) => {
        const result = [...sources].sort((a, b) => {
            const numberA = parseInt(a.match(/\d+/)?.[0] || '', 10);
            const numberB = parseInt(b.match(/\d+/)?.[0] || '', 10);
            return numberA - numberB;
        });
        return result;
    }, []);


    const { t } = useClientTranslation("picture-galleries");

    return (
        <div style={{ cursor: "pointer" }}>
            <Fancybox >

                <div className={cls.cover}>
                    <a data-fancybox={title} href={cover.url} >
                        <Image loading={"eager"} src={cover.url}
                            width="250"
                            height="292"
                            className={cls.coverImage}
                            alt={cover.name}
                        />
                        <h2 className={cls.title}>{t(`${title}`)}</h2>
                    </a>
                </div>


                <div style={{ display: "none" }}>
                    {getSortedSources(sources).map((source, index) => (
                        index !== 0 ? (
                            <a key={index} data-fancybox={title} href={source}>
                                {/*// @ts-ignore*/}
                                {/*<Image loading={"lazy"} alt={source.split('/').pop()?.split('.')[0]} src={source} width="200" height="150" />*/}
                            </a>
                        ) : null
                    ))}
                </div>


            </Fancybox>
        </div>
    );
});

GalleryCategoriesWithModalSlider.displayName = "GalleryCategoriesWithModalSlider";