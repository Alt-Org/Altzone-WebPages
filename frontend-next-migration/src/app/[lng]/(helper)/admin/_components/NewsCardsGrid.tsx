'use client';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';

type Props = { image: any };

export default function NewsCardsGrid({ image }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '10px',
                flexWrap: 'wrap',
                margin: '10px 0 20px',
            }}
        >
            {[{ id: 1 }, { id: 2 }].map((card) => (
                <div
                    key={card.id}
                    style={{
                        width: '100%',
                        flexBasis: 'calc(50% - 5px)',
                    }}
                >
                    <ModularCard
                        className="customClass"
                        theme={ModularCardTheme.NEWSCARD}
                        withScalableLink
                    >
                        <ModularCard.Texts>
                            <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
                            <ModularCard.Texts.Body>
                                This is the main content, adapting to both desktop and mobile
                                devices main content, adapting to both desktop and mobile devices
                                main content, adapting to both desktop and mobile devices main
                                content, adapting to both desktop and mobile devices
                            </ModularCard.Texts.Body>
                            <ModularCard.Texts.Footnote>Footnote</ModularCard.Texts.Footnote>
                        </ModularCard.Texts>
                        <ModularCard.Image>
                            <ModularCard.Image.Triangle />
                            <ModularCard.Image.Image
                                src={image}
                                alt="hannu hodari"
                            />
                        </ModularCard.Image>
                    </ModularCard>
                </div>
            ))}

            <div style={{ width: '100%' }}>
                <ModularCard
                    className="customClass"
                    theme={ModularCardTheme.TITLEIMAGE}
                    path="/fi/page/details"
                    isExternal={false}
                    withScalableLink
                >
                    <ModularCard.Texts>
                        <ModularCard.Texts.Title>Title</ModularCard.Texts.Title>
                    </ModularCard.Texts>
                    <ModularCard.Image>
                        <ModularCard.Image.Triangle />
                        <ModularCard.Image.Image
                            src={image}
                            alt="hannu hodari"
                        />
                    </ModularCard.Image>
                </ModularCard>
            </div>
        </div>
    );
}
