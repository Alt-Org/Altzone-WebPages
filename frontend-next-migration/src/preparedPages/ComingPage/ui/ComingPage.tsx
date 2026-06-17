'use client';
import cls from './ComingPage.module.scss';
import Image from 'next/image';
import { Glass } from '@/shared/ui/Glass';
import titleFogImg from '@/shared/assets/images/titlefog.png';
import comingSoonSign from '@/shared/assets/images/Coming-soon-sign.png';
import stoner from '@/shared/assets/images/comingPage/possyttelija.png';
import delusion from '@/shared/assets/images/comingPage/harhaisuus.png';
import fashionMadness from '@/shared/assets/images/comingPage/muotihulluus.png';
import jokester from '@/shared/assets/images/comingPage/vitsinvaantaja.png';
import veteran from '@/shared/assets/images/comingPage/posttraumaattinenveteraani.png';
import pedant from '@/shared/assets/images/comingPage/viisastelija.png';
import fatigue from '@/shared/assets/images/comingPage/vasyminen.png';

export type Props = {
    title: string;
    lng?: string;
};

const ComingPage = (props: Props) => {
    const { title, lng } = props;
    const isFinnish = lng === 'fi';

    const viewBox = '0 0 1700 120';
    const pathId = 'textArc';
    const pathD = 'M 50 200 Q 850 -300 1650 200';
    const imgX = '50';
    const imgY = '-220';
    const imgW = '1600';
    const imgH = '420';

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
                                letterSpacing={isFinnish ? '5' : '-10'}
                            >
                                {title}
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
                            src={stoner}
                            alt="Pössyttelijä"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={delusion}
                            alt="Harhaisuus"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={fashionMadness}
                            alt="Muotihulluus"
                            priority={true}
                            width={150}
                            height={150}
                            className={cls.flipped}
                        />
                        <Image
                            src={jokester}
                            alt="Vitsinvääntäjä"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={veteran}
                            alt="Posttraumaattinen veteraani"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={pedant}
                            alt="Viisastelija"
                            priority={true}
                            width={150}
                            height={150}
                        />
                        <Image
                            src={fatigue}
                            alt="Väsyminen"
                            priority={true}
                            width={150}
                            height={150}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ComingPage;
