'use client';
import type { CSSProperties } from 'react';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';

type HeroImg = { id: number; src: any }; // next/image static import is fine as any

type Props = { heroes: HeroImg[] };

export default function DefenseGalleryGrid({ heroes }: Props) {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                margin: '10px 0 20px',
            }}
        >
            {heroes.map((card) => (
                <div
                    key={card.id}
                    style={{ flexBasis: 'calc(50% - 8px)' }}
                >
                    <ModularCard
                        className="customClass"
                        theme={ModularCardTheme.DEFENSECARD}
                        withScalableLink
                    >
                        <ModularCard.Texts>
                            <ModularCard.Texts.Title>Torjujat </ModularCard.Texts.Title>
                            <ModularCard.Texts.Body>Hahmon nimi</ModularCard.Texts.Body>
                        </ModularCard.Texts>
                        <ModularCard.Image style={{ '--before-color': 'green' } as CSSProperties}>
                            <ModularCard.Image.Image
                                src={card.src}
                                alt="hannu hodari"
                            />
                        </ModularCard.Image>
                    </ModularCard>
                </div>
            ))}
        </div>
    );
}
