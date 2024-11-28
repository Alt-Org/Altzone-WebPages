import { ReactNode } from 'react';
import { LayoutWithIntro } from '@/preparedPages/Layouts';
import { useServerTranslation } from '@/shared/i18n';
import { BlurLine } from '@/shared/ui/PageDividers';
import cls from './Layout.module.scss';

type Props = {
    children: ReactNode;
    params: {
        lng: string;
    };
};

export default async function ComicsLayout({ children, params }: Props) {
    const { lng } = params;

    const { t } = await useServerTranslation(lng, 'comics');
    return (
        <LayoutWithIntro
            introHeight={'70vh'}
            title={t('page-title')}
            bgImage={
                'https://unknownworlds.com/_next/image?url=https%3A%2F%2Fd17c72h1ypygg7.cloudfront.net%2Fnews_hero_72ff4c6996.png&w=1440&q=75'
            }
            description={t('page-description')}
        >
            <BlurLine className={cls.blurLine} />
            {children}
        </LayoutWithIntro>
    );
}
