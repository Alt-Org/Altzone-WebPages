'use client';
import { ReactNode } from 'react';
import cls from './ComingPage.module.scss';
import Image from 'next/image';
import { Glass } from '@/shared/ui/Glass';
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

type LetterData = {
    char: string;
    x: number;
    y: number;
    matrix: string;
};

const finnishLetterData: LetterData[] = [
    { char: 'J', x: 240, y: 171.68, matrix: 'matrix(0.87, -0.49, 0.53, 0.85, 0, 0)' },
    { char: 'o', x: 284.62, y: 136.64, matrix: 'matrix(0.89, -0.45, 0.48, 0.87, 0, 0)' },
    { char: 't', x: 353.88, y: 117.14, matrix: 'matrix(0.91, -0.41, 0.44, 0.9, 0, 0)' },
    { char: 'a', x: 397.68, y: 89.4, matrix: 'matrix(0.93, -0.37, 0.4, 0.92, 0, 0)' },
    { char: 'i', x: 466.64, y: 75.79, matrix: 'matrix(0.94, -0.33, 0.36, 0.93, 0, 0)' },
    { char: 'n', x: 506.09, y: 51.86, matrix: 'matrix(0.96, -0.29, 0.32, 0.95, 0, 0)' },
    { char: '\u00A0', x: 583.42, y: 42.16, matrix: 'matrix(0.97, -0.25, 0.27, 0.96, 0, 0)' },
    { char: 's', x: 621.31, y: 28.43, matrix: 'matrix(0.98, -0.22, 0.24, 0.97, 0, 0)' },
    { char: 'i', x: 682.26, y: 21.01, matrix: 'matrix(0.98, -0.18, 0.2, 0.98, 0, 0)' },
    { char: 'i', x: 722.21, y: 14.72, matrix: 'matrix(0.99, -0.15, 0.17, 0.99, 0, 0)' },
    { char: 's', x: 763.12, y: 7.07, matrix: 'matrix(0.99, -0.12, 0.13, 0.99, 0, 0)' },
    { char: 't', x: 825.4, y: 3.25, matrix: 'matrix(1, -0.08, 0.09, 1, 0, 0)' },
    { char: 'i', x: 872.46, y: 1.17, matrix: 'matrix(1, -0.05, 0.05, 1, 0, 0)' },
    { char: '\u00E4', x: 914.28, y: 0, matrix: 'matrix(1, -0.01, 0.01, 1, 0, 0)' },
    { char: '\u00A0', x: 984.36, y: 0.44, matrix: 'matrix(1, 0.03, -0.03, 1, 0, 0)' },
    { char: 'o', x: 1018.41, y: 1.45, matrix: 'matrix(1, 0.07, -0.08, 1, 0, 0)' },
    { char: 'n', x: 1089.5, y: 7.29, matrix: 'matrix(0.99, 0.13, -0.14, 0.99, 0, 0)' },
    { char: '\u00A0', x: 1163.79, y: 18.08, matrix: 'matrix(0.99, 0.17, -0.18, 0.98, 0, 0)' },
    { char: 't', x: 1197.77, y: 24.59, matrix: 'matrix(0.98, 0.2, -0.22, 0.98, 0, 0)' },
    { char: 'e', x: 1239.36, y: 33.99, matrix: 'matrix(0.97, 0.24, -0.26, 0.97, 0, 0)' },
    { char: 'k', x: 1300.48, y: 50.67, matrix: 'matrix(0.96, 0.28, -0.31, 0.95, 0, 0)' },
    { char: 'e', x: 1367.64, y: 73.05, matrix: 'matrix(0.94, 0.33, -0.36, 0.93, 0, 0)' },
    { char: 'i', x: 1427.12, y: 96.36, matrix: 'matrix(0.93, 0.37, -0.4, 0.92, 0, 0)' },
    { char: 'l', x: 1460.97, y: 111.37, matrix: 'matrix(0.92, 0.39, -0.43, 0.9, 0, 0)' },
    { char: 'l', x: 1491.58, y: 126.06, matrix: 'matrix(0.91, 0.42, -0.45, 0.89, 0, 0)' },
    { char: '\u00E4', x: 1521.46, y: 141.92, matrix: 'matrix(0.89, 0.45, -0.49, 0.87, 0, 0)' },
    { char: '!', x: 1581.86, y: 175.85, matrix: 'matrix(0.87, 0.49, -0.53, 0.85, 0, 0)' },
];

const ComingPage = (props: Props) => {
    const { title } = props;

    const isFinnish = title === 'Jotain siistiä on tekeillä!';

    return (
        <main className={cls.main}>
            <div className={cls.pageContent}>
                {isFinnish ? (
                    <div className={cls.finnishTitleContainer}>
                        {finnishLetterData.map((letter, i) => (
                            <div
                                key={`glass-${i}`}
                                className={cls.letterPosition}
                                style={{
                                    left: `${(letter.x / 1920) * 100}%`,
                                    top: `${(letter.y / 300) * 100}%`,
                                }}
                            >
                                <Glass style={{ height: '160px' }}>
                                    <span />
                                </Glass>
                            </div>
                        ))}
                        <svg
                            viewBox="0 0 1920 300"
                            className={cls.curvedText}
                        >
                            {finnishLetterData.map((letter, i) => (
                                <text
                                    key={i}
                                    transform={`translate(${letter.x} ${letter.y}) ${letter.matrix}`}
                                    className={cls.curvedTextPath}
                                >
                                    {letter.char}
                                </text>
                            ))}
                        </svg>
                    </div>
                ) : (
                    <div className={cls.titleSection}>
                        <Glass className={cls.titleFog}>
                            <span />
                        </Glass>
                        <svg
                            viewBox="0 0 1700 300"
                            className={cls.curvedText}
                        >
                            <path
                                id="textArc"
                                d="M 50 180 Q 850 -160 1650 180"
                                fill="none"
                            />
                            <text>
                                <textPath
                                    href="#textArc"
                                    startOffset="50%"
                                    textAnchor="middle"
                                    className={cls.curvedTextPath}
                                >
                                    {title}
                                </textPath>
                            </text>
                        </svg>
                    </div>
                )}
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
