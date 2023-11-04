import {memo, useCallback} from "react";
import Fancybox from "@/shared/ui/Fancybox/Fancybox";


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
    }, [sources]);

    return (
        <div style={{ cursor: "pointer" }}>
            <Fancybox >
                <a data-fancybox={title} href={cover.url}>
                    <img src={cover.url} width="200" height="150" alt={cover.name} />
                    <h2>{title}</h2>
                </a>

                <div style={{display:"none"}}>
                    {getSortedSources(sources).map((source, index) => (
                        index !== 0 ? (
                            <a key={index} data-fancybox={title} href={source}>
                                <div>loool</div>
                                <img alt={source.split('/').pop()?.split('.')[0]} src={source} width="200" height="150" />
                            </a>
                        ) : null
                    ))}
                </div>


            </Fancybox>
        </div>
    );
});
