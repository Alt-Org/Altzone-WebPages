import { memo } from 'react';
import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import { SocialSection } from '@/shared/SocialSection/SocialSection';
import { classNames } from '@/shared/lib/classNames/classNames';
import type { SocialIconLink } from '@/shared/types';
import topimage from '@/shared/assets/images/mainpage/topimage.png';
import cls from './HeaderDesktop.module.scss';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

const HeaderDesktopComponent = memo((props: Props) => {
    const { className = '', socialIconLinks } = props;

    return (
        <header className={classNames(cls.Header, {}, [className])}>
            <Container className={cls.container}>
                <div className={cls.left}>
                    <Image
                        src={topimage}
                        alt="Main page hero"
                        priority
                    />
                </div>

                <div className={cls.right}>
                    <div className={cls.textBlock}>
                        {/* TODO: Header text content */}
                        {/* <h1 className={cls.title}>...</h1>
            <p className={cls.subtitle}>...</p> */}
                    </div>

                    <SocialSection
                        className={cls.socialSection}
                        socialIconLinks={socialIconLinks}
                    />
                </div>
            </Container>
        </header>
    );
});

HeaderDesktopComponent.displayName = 'HeaderDesktopComponent';

export { HeaderDesktopComponent as HeaderDesktop };
