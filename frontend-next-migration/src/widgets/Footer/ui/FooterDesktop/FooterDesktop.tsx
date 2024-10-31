import { memo } from 'react';
import { Container } from '@/shared/ui/Container';
import { SocialIconLink, Texts } from '../../model/types/types';
import { Rights } from '../Rights/Rights';
import { SocialSection } from '../SocialSection/SocialSection';
import { Title } from '../Title/Title';
import cls from './FooterDesktop.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';

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
            <Container>
                <Title
                    className={cls.title}
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
        </footer>
    );
});

FooterDesktopComponent.displayName = 'FooterDesktopComponent';

export default FooterDesktopComponent;
