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
  id: number;
  srcImg: string;
  srcGif: string;
  alt: string;
  title: string;
  borderColor: string;
  description: string;
  group: string;
  color: string;
};

const HeroContainer = ({
  id,
  srcImg,
  srcGif,
  alt,
  title,
  borderColor,
  description,
  group,
  color,
}: Props) => {
  const router = useRouter();

  // Log props received by HeroContainer
  console.log('HeroContainer props:', {
    id,
    srcImg,
    srcGif,
    alt,
    title,
    borderColor,
    description,
    group,
    color,
  });

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
            <h2>{title}</h2>
          </div>
          <div className={cls.HeroInfoMain}>
            <Image
              src={srcGif}
              alt='heroGif'
              className={cls.InfoImg}
              priority={true}
            />
            <p className={cls.description}>{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroContainer;
