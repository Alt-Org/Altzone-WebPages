'use client';
import { HeroGroup, HeroManager } from '@/entities/Hero';
import { initializeHeroGroups } from '@/entities/Hero/model/initializeHeroGroups';
import { useClientTranslation } from '@/shared/i18n';
import { DescriptionCard, DescriptionCardTheme } from '@/shared/ui/v2/DescriptionCard';
import retroflector from '@/shared/assets/images/descriptionCard/retroflector.png';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';

export interface Props {
    heroGroup: HeroGroup;
}
const SingleDefensePage = (props: Props) => {
    const { heroGroup } = props;
    const { t } = useClientTranslation('heroes');
    const heroGroups = initializeHeroGroups(t);

    //const heroManager = new HeroManager(t);
    //console.log(heroManager.getHeroesBySpecificGroup(heroGroup));
    return (
        <div>
            <DescriptionCard theme={DescriptionCardTheme.DEFENSEGALLERY}>
                <DescriptionCard.Texts>
                    <DescriptionCard.Texts.Title>
                        {heroGroups[heroGroup].name}
                    </DescriptionCard.Texts.Title>
                    <DescriptionCard.Texts.Body>
                        {heroGroups[heroGroup].description}
                    </DescriptionCard.Texts.Body>
                </DescriptionCard.Texts>
                <DescriptionCard.Image bgColour={heroGroups[heroGroup].bgColour}>
                    <DescriptionCard.Image.Triangle />
                    <DescriptionCard.Image.Image
                        src={heroGroups[heroGroup].srcImg}
                        alt={heroGroups[heroGroup].name}
                        height={100}
                        marginLeft="20%"
                    />
                </DescriptionCard.Image>
            </DescriptionCard>
            <div
                style={{
                    display: 'flex',
                    paddingTop: '1em',
                    justifyContent: 'left',
                    flexWrap: 'wrap',
                    gap: '1em',
                }}
            >
                {heroGroups[heroGroup].heroes.map((hero, index) => (
                    <div
                        key={index}
                        style={{ width: 'calc(50% - .5em)' }}
                    >
                        <ModularCard
                            className="customClass"
                            theme={ModularCardTheme.DEFENSECARD}
                            withScalableLink={true}
                            path={`/defense-gallery/${heroGroup}/${hero.slug}`}
                            height="150px"
                        >
                            <ModularCard.Texts>
                                <ModularCard.Texts.Title>
                                    {heroGroups[heroGroup].name}
                                </ModularCard.Texts.Title>
                                <ModularCard.Texts.Body>{hero.title}</ModularCard.Texts.Body>
                            </ModularCard.Texts>
                            <ModularCard.Image
                                style={
                                    {
                                        '--before-color': heroGroups[heroGroup].bgColour,
                                    } as React.CSSProperties
                                }
                            >
                                <ModularCard.Image.Image
                                    src={hero.srcImg}
                                    alt={hero.title}
                                />
                            </ModularCard.Image>
                        </ModularCard>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default SingleDefensePage;
