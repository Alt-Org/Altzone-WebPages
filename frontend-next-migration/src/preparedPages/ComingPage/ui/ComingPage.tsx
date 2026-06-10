'use client';
import { ReactNode } from 'react';
import cls from './ComingPage.module.scss';
import Image from 'next/image';
import { Glass } from '@/shared/ui/Glass';
import titleFogImg from '@/shared/assets/images/titlefog.png';
import comingSoonSign from '@/shared/assets/images/Coming-soon-sign.png';
import hateSpeech from '@/shared/assets/images/heros/hate-speech/Vihapuhe.png';
import jokester from '@/shared/assets/images/heros/jokester/Jokester.png';
import believer from '@/shared/assets/images/heros/fate-priest/Believer.png';
import provocator from '@/shared/assets/images/heros/provocator/Provokaattori.png';
import alcoholic from '@/shared/assets/images/heros/alcoholic/Alkoholisti.png';
import purpleGirls from '@/shared/assets/images/heros/purple-girls/purpel-girls-main.png';
import pedant from '@/shared/assets/images/heros/pedant/Viisastelija.png';

export type Props = {
    title: string;
    text: ReactNode;
};

const ComingPage = (props: Props) => {
    const { title } = props;

    const isFinnish = title === 'Jotain siistiä on tekeillä!';
    const viewBox = isFinnish ? '0 0 1920 300' : '0 0 1700 300';
    const pathId = isFinnish ? 'textArcFi' : 'textArc';
    const pathD = isFinnish ? 'M 56 180 Q 960 -280 1864 180' : 'M 50 180 Q 850 -160 1650 180';
    const imgX = isFinnish ? '100' : '50';
    const imgY = isFinnish ? '-270' : '-170';
    const imgW = isFinnish ? '1720' : '1600';
    const imgH = isFinnish ? '600' : '340';
    const text = isFinnish ? 'Jotain siistiä on tekeillä!' : title;

    return (
        <main className={cls.main}>
            <div className={cls.pageContent}>
                <div className={cls.titleSection}>
                    <Glass className={cls.titleFog}>
                        <span />
                    </Glass>
                    <svg
                        viewBox={viewBox}
                        className={cls.curvedText}
                    >
                        <image
                            href={titleFogImg.src}
                            x={imgX}
                            y={imgY}
                            width={imgW}
                            height={imgH}
                            preserveAspectRatio="xMidYMid slice"
                        />
                        <path
                            id={pathId}
                            d={pathD}
                            fill="none"
                        />
                        <text>
                            <textPath
                                href={`#${pathId}`}
                                startOffset="50%"
                                textAnchor="middle"
                                className={cls.curvedTextPath}
                            >
                                {text}
                            </textPath>
                        </text>
                    </svg>
                </div>
                <div className={cls.bodySection}>
                    <div className={cls.signWrapper}>
                        <Image
                            src={comingSoonSign}
                            alt="Coming soon sign"
                            priority
                            width={700}
                            height={617}
                        />
                    </div>
                    <div className={cls.images}>
                        <Image
                            src={hateSpeech.src}
                            alt="Hate Speech"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={jokester}
                            alt="Jokester"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={believer}
                            alt="Believer"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={provocator}
                            alt="Provocator"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={alcoholic}
                            alt="Alcoholic"
                            width={150}
                            height={150}
                            priority={true}
                            className={cls.flipped}
                        />
                        <Image
                            src={purpleGirls}
                            alt="Purple Girls"
                            width={150}
                            height={150}
                            priority={true}
                            className={cls.flipped}
                        />
                        <Image
                            src={pedant}
                            alt="Pedant"
                            priority={true}
                            width={150}
                            height={150}
                            className={cls.pedant}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ComingPage;
