import { useClientTranslation } from '@/shared/i18n';
import cls from './TeamHeaderDesktop.module.scss';
import Image from 'next/image';

type Props = {
    image: string;
};

export function TeamHeaderDesktop({ image }: Props) {
    const { t } = useClientTranslation('members');

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
            <div className={cls.HeaderImageContainer}>
                <Image
                    src={image}
                    alt={'Header image'}
                    width={1000}
                    height={1000}
                    quality={100}
                    className={cls.headerImg}
                    loading={'eager'}
                />
            </div>
        </div>
    );
}
