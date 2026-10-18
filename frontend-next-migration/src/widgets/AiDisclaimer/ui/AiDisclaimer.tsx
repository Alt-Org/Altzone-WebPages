'use client';
import Image from 'next/image';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AiDisclaimer.module.scss';

interface AiDisclaimerProps {
    className?: string;
}

export const AiDisclaimer = ({ className = '' }: AiDisclaimerProps) => {
    const { t } = useClientTranslation('ai-disclaimer');

    return (
        <section
            className={classNames(cls.AiDisclaimer, {}, [className])}
            aria-labelledby="ai-disclaimer-title"
        >
            <Container className={cls.content}>
                <div className={cls.header}>
                    <Image
                        className={cls.icon}
                        src="/images/logos/CommonLogoAIContent.png"
                        alt=""
                        width={256}
                        height={256}
                    />
                    <h2
                        id="ai-disclaimer-title"
                        className={cls.title}
                    >
                        {t('title')}
                    </h2>
                </div>
                <p className={cls.lead}>{t('lead')}</p>
                <p className={cls.text}>{t('detail')}</p>
            </Container>
        </section>
    );
};
