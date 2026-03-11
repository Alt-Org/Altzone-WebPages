'use client';
import { memo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import type { SocialIconLink } from '@/shared/types';
import topimage from '@/shared/assets/images/mainpage/topimage.png';
import altZoneCls from '@/preparedPages/MainPage/ui/_components/sections/AltZone/AltZone.module.scss';
import cls from './HeaderMobile.module.scss';
import { Button, ButtonTheme, ButtonSize } from '@/shared/ui/Button';
import { Paragraph } from '@/shared/ui/Paragraph';
import { useClientTranslation } from '@/shared/i18n';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

const HeaderMobileComponent = memo((props: Props) => {
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
            <div className={cls.imageWrap}>
                <Image
                    src={topimage}
                    alt="Main page hero"
                    priority
                    fill
                    sizes="100vw"
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className={cls.content}>
                <h1 className={cls.title}>{title}</h1>

                <div className={altZoneCls.InfoText}>
                    {paragraphs.map((text, idx) => (
                        <Paragraph
                            key={idx}
                            text={text}
                        />
                    ))}
                </div>

                <div className={cls.ctaCol}>
                    <Link
                        href={`/${lng}/about`}
                        className={cls.ctaLink}
                    >
                        <Button
                            theme={ButtonTheme.SECONDARY}
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
                            theme={ButtonTheme.SECONDARY}
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
        </header>
    );
});

HeaderMobileComponent.displayName = 'HeaderMobileComponent';

export default HeaderMobileComponent;
