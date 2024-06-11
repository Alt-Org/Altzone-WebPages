'use client';
import React from 'react';
import cls from './HeroContainer.module.scss';
import Image from 'next/image';
import infoBg from '@/shared/assets/images/heros/hero-container/info-bg.png';
import bgAlyllistajat from '@/shared/assets/images/backgrounds/bgAlyllistajat.png';
import bgHamaajat from '@/shared/assets/images/backgrounds/bgHamaajat.png';
import bgPeilaajat from '@/shared/assets/images/backgrounds/bgPeilaajat.png';
import bgSulautujat from '@/shared/assets/images/backgrounds/bgSulautujat.png';
import bgTorjujat from '@/shared/assets/images/backgrounds/bgTorjujat.png';
import bgTottelijat from '@/shared/assets/images/backgrounds/bgTottelijat.png';
import { useRouter } from 'next/navigation';

type Props = {
  heroGif: any;
  heroName: string;
  heroDescription: string;
  group: string;
  className?: string;
};

const HeroContainer = ({
  heroGif,
  heroName,
  heroDescription,
  group,
}: Props) => {
  const router = useRouter();

  const groupBackgrounds: { [key: string]: any } = {
    'ÄLYLLISTÄJÄT // EGOTISMI': bgAlyllistajat,
    'HÄMÄÄJÄT // DEFLEKTIO': bgHamaajat,
    'PEILAAJAT // PROJEKTIO': bgPeilaajat,
    'SULAUTUJAT // KONFLUENSSI': bgSulautujat,
    'TORJUJAT // RETROFLEKTIO': bgTorjujat,
    'TOTTELIJAT // INTROJEKTIO': bgTottelijat,
  };

  const background = groupBackgrounds[group];

  if (!background) {
    console.error(`No background found for hero group: ${group}`);
  }

  return (
    <section className={cls.HeroContainer}>
      <div className={cls.backgroundImageWrapper}>
        {background ? (
          <Image
            src={background}
            alt='groupBackground'
            className={cls.backgroundImage}
          />
        ) : null}
      </div>
      <div className={cls.Content}>
        <div className={cls.HeroInfoDiv}>
          <Image
            src={infoBg}
            alt='infoBg'
            className={cls.InfoBgImg}
            priority={true}
          />
          <div className={cls.HeroInfoHeader}>
            <hr />
            <h2>{heroName}</h2>
            <hr />
          </div>
          <div className={cls.HeroInfoMain}>
            <Image
              src={heroGif}
              alt='heroGif'
              className={cls.InfoImg}
              priority={true}
            />
            <p className={cls.description}>{heroDescription}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContainer;
