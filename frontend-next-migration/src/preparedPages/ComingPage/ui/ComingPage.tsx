'use client';
import { ReactNode } from 'react';
import cls from './ComingPage.module.scss';
import Image from 'next/image';
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
    const { title, text } = props;

    return (
        <main className={cls.main}>
            <div className={cls.container}>
                <h1 className={cls.title}>{title}</h1>
                <div className={cls.title}>{text}</div>
                <div className={cls.images}>
                    <Image
                        src={hateSpeech.src}
                        alt="Hate Speech"
                        width={150}
                        height={150}
                    />
                    <Image
                        src={jokester}
                        alt="Jokester"
                        width={150}
                        height={150}
                    />
                    <Image
                        src={believer}
                        alt="Believer"
                        width={150}
                        height={150}
                    />
                    <Image
                        src={provocator}
                        alt="Provocator"
                        width={150}
                        height={150}
                    />
                    <Image
                        src={alcoholic}
                        alt="Alcoholic"
                        width={150}
                        height={150}
                        className={cls.flipped}
                    />
                    <Image
                        src={purpleGirls}
                        alt="Purple Girls"
                        width={150}
                        height={150}
                        className={cls.flipped}
                    />
                    <Image
                        src={pedant}
                        alt="Pedant"
                        width={150}
                        height={150}
                        className={cls.pedant}
                    />
                </div>
            </div>
        </main>
    );
};

export default ComingPage;
