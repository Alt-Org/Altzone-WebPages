'use client';
import Image from 'next/image';
import { ModularCard, ModularCardTheme } from '@/shared/ui/v2/ModularCard';
import clanLogo from '@/shared/assets/images/clanLogos/CommonSelectHeart 1.png';
import iconSpammer from '@/shared/assets/images/clanLabels/ClanLabelSpammer.png';
import iconHumorous from '@/shared/assets/images/clanLabels/ClanLabelHumorous.png';
import iconAnimalLovers from '@/shared/assets/images/clanLabels/ClanLabelAnimalLovers.png';
import iconLeaderboard from '@/shared/assets/images/clanLogos/LeaderboardWinFirstPlace.png';
import iconFlagFi from '@/shared/assets/images/clanLogos/CommonFlagFinland 1.png';

type LabelKey = 'spammer' | 'humorous' | 'animalLovers';

const LABEL_META: Record<LabelKey, { text: string; icon: any }> = {
    spammer: { text: 'Spämmääjät', icon: iconSpammer },
    humorous: { text: 'Humoristiset', icon: iconHumorous },
    animalLovers: { text: 'Eläinrakkaat', icon: iconAnimalLovers },
};

export default function CardTestPage() {
    const labels: LabelKey[] = ['spammer', 'humorous', 'animalLovers'];

    return (
        <div style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
            <ModularCard
                theme={ModularCardTheme.CLAN}
                onClick={() => alert('Card clicked')}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        alert('Card clicked');
                    }
                }}
            >
                {/* Figma-style layout: left text/meta/badges, right emblem */}
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 160px',
                        gap: '1rem',
                        alignItems: 'center',
                    }}
                >
                    {/* LEFT */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {/* Clan name in white */}
                        <h3 style={{ margin: 0, color: 'var(--white)' }}>Klaani nimi</h3>

                        {/* Meta row in white */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.75rem 1rem',
                                color: 'var(--white)',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    whiteSpace: 'nowrap',
                                    gap: '.35rem',
                                }}
                            >
                                <Image
                                    src={iconLeaderboard}
                                    alt="Leaderboard"
                                    width={18}
                                    height={18}
                                />
                                <Image
                                    src={iconFlagFi}
                                    alt="Finland"
                                    width={18}
                                    height={18}
                                />
                                <span style={{ opacity: 0.85 }}>Members</span> 8 / 30
                            </span>

                            <span style={{ whiteSpace: 'nowrap' }}>222333</span>
                        </div>

                        {/* Orange pill badges */}
                        <div
                            style={{
                                display: 'flex',
                                gap: '.5rem',
                                flexWrap: 'wrap',
                                marginTop: '.25rem',
                            }}
                        >
                            {labels.map((key) => {
                                const { text, icon } = LABEL_META[key];
                                return (
                                    <span
                                        key={key}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '.4rem',
                                            background: 'var(--accent-600, #F5A623)',
                                            color: 'var(--text-on-accent, #1a1a1a)',
                                            border: '2px solid var(--black)',
                                            boxShadow: 'var(--black) 4px 4px 0',
                                            borderRadius: 10,
                                            padding: '.35em .7em .35em .45em',
                                            fontSize: '.875rem',
                                            lineHeight: 1,
                                        }}
                                    >
                                        <Image
                                            src={icon}
                                            alt={text}
                                            width={18}
                                            height={18}
                                            style={{ display: 'block' }}
                                        />
                                        {text}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT emblem (no border) */}
                    <div
                        style={{
                            position: 'relative',
                            width: 160,
                            height: 160,
                            borderRadius: 12,
                            overflow: 'hidden',
                            justifySelf: 'end',
                        }}
                    >
                        <Image
                            src={clanLogo}
                            alt="clan logo"
                            fill
                            sizes="160px"
                        />
                    </div>
                </div>
            </ModularCard>
        </div>
    );
}
