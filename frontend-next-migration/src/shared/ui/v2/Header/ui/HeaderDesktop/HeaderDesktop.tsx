'use client';
import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button, ButtonTheme, ButtonSize } from '@/shared/ui/Button';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { SocialIconLink } from '@/shared/types';
import topimage from '@/shared/assets/images/mainpage/topimage.png';
import cls from './HeaderDesktop.module.scss';
import altZoneCls from '@/preparedPages/MainPage/ui/_components/sections/AltZone/AltZone.module.scss';
import { Paragraph } from '@/shared/ui/Paragraph';
import { useClientTranslation } from '@/shared/i18n';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

const HeaderDesktopComponent = memo((props: Props) => {
    const { className = '', socialIconLinks } = props;

    const params = useParams();
    const lng = (params?.lng as string) ?? 'fi';

    const { t } = useClientTranslation('main');

    const title = t('project-description-title');
    const fullText = t('project-description-text');
    const paragraphs = fullText.split('\n\n').filter(Boolean);

    const followText = t('follow-us-text');

    return (
        <header className={classNames(cls.Header, {}, [className])}>
            <div className={cls.container}>
                <div className={cls.left}>
                    <Image
                        src={topimage}
                        alt="Main page hero"
                        priority
                        fill
                        sizes="(min-width: 1200px) 60vw, 100vw"
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div className={cls.right}>
                    <h1 className={cls.title}>{title}</h1>

                    <div className={altZoneCls.InfoText}>
                        {paragraphs.map((text, idx) => (
                            <Paragraph
                                key={idx}
                                text={text}
                            />
                        ))}
                    </div>

                    <div className={cls.ctaRow}>
                        <Link
                            href={`/${lng}/about`}
                            className={cls.ctaLink}
                        >
                            <Button
                                theme={ButtonTheme.PRIMARY_2}
                                size={ButtonSize.L}
                            >
                                {t('main-about')}
                            </Button>
                        </Link>

                        <Link
                            href={`/${lng}/prg`}
                            className={cls.ctaLink}
                        >
                            <Button
                                theme={ButtonTheme.PRIMARY_2}
                                size={ButtonSize.L}
                            >
                                {t('main-prg')}
                            </Button>
                        </Link>
                    </div>

                    <div className={cls.followText}>{followText}</div>

                    <SocialSection
                        variant="header"
                        className={cls.socialSection}
                        socialIconLinks={socialIconLinks}
                    />
                </div>
            </div>
        </header>
    );
});

HeaderDesktopComponent.displayName = 'HeaderDesktopComponent';

export default HeaderDesktopComponent;
