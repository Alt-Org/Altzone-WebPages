import { useClientTranslation } from '@/shared/i18n';
import cls from './TeamHeaderDesktop.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

type Props = {
    image: string;
};

export function TeamHeaderDesktop({ image }: Props) {
    const { t } = useClientTranslation('members');

    return (
        <div className={cls.HeaderContainer}>
            <div className={cls.TitleContainer}>
                <h2>{t('head-title')}</h2>
                <div className={cls.inputContainer}>
                    <FontAwesomeIcon
                        className={cls.textInputIcon}
                        size={'lg'}
                        icon={faMagnifyingGlass}
                    />
                    <input
                        name="search"
                        placeholder={t('search_placeholder')}
                        type="text"
                        id="search"
                        className={cls.Searchfield}
                    />
                </div>
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
