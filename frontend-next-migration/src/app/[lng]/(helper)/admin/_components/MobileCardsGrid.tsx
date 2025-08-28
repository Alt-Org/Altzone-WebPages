'use client';
import type { RefObject } from 'react';
import { MobileCard, MobileCardLink, MobileCardTheme } from '@/shared/ui/v2/MobileCard';

type Props = {
    cardRef: RefObject<HTMLDivElement>;
    primary: any;
    secondary: any;
};

export default function MobileCardsGrid({ cardRef, primary, secondary }: Props) {
    const items = Array.from({ length: 9 });

    return (
        <div
            style={{
                display: 'flex',
                gap: '.5em',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginTop: '.5em',
            }}
        >
            {items.map((_, index) => {
                if (index === 0)
                    return (
                        <MobileCardLink
                            key={index}
                            path="/hero-development"
                            ariaLabel="link to hero development page"
                            withScalableLink
                        >
                            <MobileCard
                                ref={cardRef}
                                theme={MobileCardTheme.DEFENSEGALLERY}
                            >
                                <MobileCard.Texts
                                    title1="Mikälie"
                                    title2="Skitsofreenikko"
                                />
                                <MobileCard.Image
                                    backgroundColor="yellow"
                                    src={primary}
                                    alt="Jåker"
                                />
                            </MobileCard>
                        </MobileCardLink>
                    );
                return (
                    <MobileCard
                        key={index}
                        theme={MobileCardTheme.DEFENSEGALLERY}
                    >
                        <MobileCard.Texts
                            title1="Torjujat"
                            title2="Ahmatti"
                        />
                        <MobileCard.Image
                            backgroundColor="#FF0000"
                            src={secondary}
                            alt="hannu hodari"
                        />
                    </MobileCard>
                );
            })}
        </div>
    );
}
