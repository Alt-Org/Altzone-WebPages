import { useServerTranslation } from '@/shared/i18n';
import Image from 'next/image';
import headerImg from '@/shared/assets/images/members/members8.webp';
import cls from './TeamHeaderDesktop.module.scss';

type Props = {
    lng: string;
};

export default async function TeamHeaderDesktop({ lng }: Props) {
    const { t } = await useServerTranslation(lng, 'members');

    return (
        <div className={cls.HeaderContainer}>
            <div className={cls.TitleContainer}>
                <h2>{t('head-title')}</h2>
                <input
                    name="search"
                    placeholder={t('search_placeholder')}
                    type="text"
                    id="search"
                    className={cls.Searchfield}
                />
            </div>
            <Image
                src={headerImg}
                alt={'headerImg'}
                width={0}
                height={0}
                className={cls.headerImg}
            />
        </div>
    );
}
