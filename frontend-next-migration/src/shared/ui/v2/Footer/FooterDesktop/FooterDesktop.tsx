import { memo } from 'react';
import { Container } from '@/shared/ui/Container';
import { SocialIconLink, Texts } from '@/widgets/Footer/model/types/types';
import { Rights } from '@/widgets/Footer/ui/Rights/Rights';
import { SocialSection } from '@/widgets/Footer/ui/SocialSection/SocialSection';
import { Title } from '@/widgets/Footer/ui/Title/Title';
import cls from './FooterDesktop.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Ahmat from '@/shared/assets/images/heros/hannu-hodari/hannu-hodari.png';
import Image from 'next/image';
import { FeedbackCard } from '@/shared/ui/v2/Feedback';
import { Sedgwick_Ave_Display } from 'next/font/google';

const sedgwickFont = Sedgwick_Ave_Display({
    subsets: ['latin'],
    weight: '400',
});

interface Props {
    title: string;
    socialIconLinks: SocialIconLink[];
    texts: Texts;
    className?: string;
}

const FooterDesktopComponent = memo((props: Props) => {
    const { title, socialIconLinks, texts, className = '' } = props;

    return (
        <footer className={classNames(cls.Footer, {}, [className])}>
            <Container className={cls.ImageContainer}>
                <Image
                    src={Ahmat}
                    alt={'description hero'}
                    className={classNames(cls.Imamkukui)}
                    width={270}
                    height={270}
                />
            </Container>
            <Container className={cls.FooterContainer}>
                <Title
                    className={`${cls.title}  ${sedgwickFont.className}`}
                    title={title}
                />
                <SocialSection
                    className={cls.socialSection}
                    socialIconLinks={socialIconLinks}
                />
                <Rights
                    className={cls.rights}
                    texts={texts}
                />
            </Container>
            <Container className={cls.FeedbackContainer}>
                <FeedbackCard variant={'embedabble'} />
            </Container>
        </footer>
    );
});

FooterDesktopComponent.displayName = 'FooterDesktopComponent';

export default FooterDesktopComponent;
