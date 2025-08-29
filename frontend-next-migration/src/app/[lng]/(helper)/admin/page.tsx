'use client';

import { useRef } from 'react';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { PageTitle } from '@/shared/ui/PageTitle';
import { useClientTranslation } from '@/shared/i18n';
import { WallIntroAnimation } from '@/shared/ui/v2/WallIntroAnimation';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import NavMenusBlock from './_components/NavMenusBlock';
import DefenseGalleryGrid from './_components/DefenseGalleryGrid';
import NewsCardsGrid from './_components/NewsCardsGrid';
import DescriptionCardsSection from './_components/DescriptionCardsSection';
import MobileCardsGrid from './_components/MobileCardsGrid';
import useSizes from '@/shared/lib/hooks/useSizes';

import hannu from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import vihapuhe from '@/shared/assets/images/heros/hate-speech/Vihapuhe.png';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.png';
import sleeper from '@/shared/assets/images/heros/sleeper/Sleeper_new.png';
import fatePriest from '@/shared/assets/images/heros/fate-priest/fate-priest.png';
import mirror from '@/shared/assets/images/heros/mirror/Mirror.png';

import defenceGallery from '@/shared/assets/images/descriptionCard/defense_gallery.png';
import defenceGalleryMobile from '@/shared/assets/images/descriptionCard/defense_gallery_mobile.png';
import retroflector from '@/shared/assets/images/descriptionCard/retroflector.png';

const HERO_CARDS = [
  { id: 1, src: vihapuhe },
  { id: 2, src: jokester },
  { id: 3, src: fatePriest },
  { id: 4, src: mirror },
  { id: 5, src: hannu },
  { id: 6, src: sleeper },
];

const Page = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { isMobileSize } = useSizes();
  const { t } = useClientTranslation('admin');

  const handleFocusAndScroll = () => {
    const el = cardRef.current;
    if (!el) return;
    el.focus();
    el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  return (
    <LayoutWithSidebars
      leftTopSidebar={{
        component: <NavMenusBlock variant="forum" />,
      }}
    >
      <button
        style={{
          paddingLeft: '1em',
          paddingRight: '1em',
          border: '1px solid black',
          borderRadius: '10px',
          cursor: 'pointer',
          backgroundColor: 'lightblue',
        }}
        onClick={handleFocusAndScroll}
      >
        focus
      </button>

      <h2>Testing Defense Gallery ModularCard</h2>
      <DefenseGalleryGrid heroes={HERO_CARDS} />

      <WallIntroAnimation renderOnce />

      <h4>NavMenuWithDropdownsV2 using Clan Example</h4>
      <NavMenusBlock variant="clans-collapsed" />
      <NavMenusBlock variant="clans-static" />
      <NavMenusBlock variant="clans-static-with-sub" />

      <div style={{ margin: '20px' }}>
        <h5>Theme switcher component.</h5>
      </div>
      <ThemeSwitcher />

      <h1 style={{ marginTop: '20px' }}>Main Page Content</h1>
      <NewsCardsGrid image={hannu} />

      {Array.from({ length: 15 }).map((_, idx) => (
        <p key={idx}>
          This is the main content, adapting to both desktop and mobile devices. This is the main content,
          adapting to both desktop and mobile devices
        </p>
      ))}

      <PageTitle titleText={t('adminTestTitle')} searchVisible={false} dynamicTitle="admin" />
      <PageTitle titleText={t('staticTestTitle')} searchVisible />
      <PageTitle titleText={t('adminTestTitle')} searchVisible={false} dynamicTitle="admin" />

      <DescriptionCardsSection
        isMobile={isMobileSize}
        desktopImage={defenceGallery}
        mobileImage={defenceGalleryMobile}
        retroflector={retroflector}
      />

      <MobileCardsGrid cardRef={cardRef} primary={jokester} secondary={hannu} />
    </LayoutWithSidebars>
  );
};

export default Page;

