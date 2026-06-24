'use client';
import cls from './ComingPage.module.scss';
import Image from 'next/image';
import { useClientTranslation } from '@/shared/i18n';
import titleFogImg from '@/shared/assets/images/titlefog.png';
import titleFogSmallImg from '@/shared/assets/images/titlefogsmall.png';
import comingSoonSign from '@/shared/assets/images/Coming-soon-sign.png';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import stoner from '@/shared/assets/images/comingPage/possyttelija.png';
import delusion from '@/shared/assets/images/comingPage/harhaisuus.png';
import fashionMadness from '@/shared/assets/images/comingPage/muotihulluus.png';
import jokester from '@/shared/assets/images/comingPage/vitsinvaantaja.png';
import veteran from '@/shared/assets/images/comingPage/posttraumaattinenveteraani.png';
import pedant from '@/shared/assets/images/comingPage/viisastelija.png';
import fatigue from '@/shared/assets/images/comingPage/vasyminen.png';

export type Props = {
    /** the title text that goes on the curved path */
    title: string;
    /** language code, like 'fi' for finnish. changes letter spacing a bit */
    lng?: string;
};

/** the "coming soon" page. curved title with fog, a sign, and characters*/
const ComingPage = (props: Props) => {
    const { title, lng } = props;
    const { t } = useClientTranslation('coming');
    const isFinnish = lng === 'fi';
    const { isMobileSize } = useIsMobileSize();

    const viewBox = '0 -100 1700 200';
    const pathId = 'textArc';
    const pathD = 'M 50 200 Q 850 -300 1650 200';
    const imgX = isMobileSize ? '0' : '50';
    const imgY = isMobileSize ? '-300' : '-220';
    const imgW = isMobileSize ? '1700' : '1600';
    const imgH = isMobileSize ? '600' : '420';

    return (
        <main className={cls.main}>
            <div className={cls.pageContent}>
                <div className={cls.titleSection}>
                    <svg
                        viewBox={viewBox}
                        className={cls.curvedText}
                    >
                        <image
                            href={isMobileSize ? titleFogSmallImg.src : titleFogImg.src}
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
                                {...(isMobileSize
                                    ? { textLength: '1600', lengthAdjust: 'spacing' }
                                    : {})}
                                letterSpacing={isFinnish ? '5' : '-10'}
                                style={
                                    !isFinnish && isMobileSize ? { fontSize: '130px' } : undefined
                                }
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
                        <span className={cls.signText}>{t('signTitle')}</span>
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
