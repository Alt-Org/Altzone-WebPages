import { useClientTranslation } from '@/shared/i18n';
import cls from './TeamHeader.module.scss';
import Image, { StaticImageData } from 'next/image';
import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useSizes from '@/shared/lib/hooks/useSizes';

type Props = {
    image: StaticImageData;
    children?: ReactNode;
    dropdown?: ReactNode;
};

export function TeamHeader(props: Props) {
    const { image, children, dropdown } = props;
    const { t } = useClientTranslation('members');
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;

    return isTouchDevice ? (
        <div className={cls.HeaderMobile}>
            <div className={cls.TitleContainer}>
                <h2>{t('head-title')}</h2>
            </div>
            {dropdown}
            <div className={cls.InputParent}>
                <div className={cls.InputContainer}>
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
                    width={0}
                    height={0}
                    quality={100}
                    className={cls.headerImg}
                    loading={'eager'}
                />
            </div>
        </div>
    ) : (
        <>
            <div className={cls.HeaderContainer}>
                <div className={cls.DesktopTitleContainer}>
                    <h2>{t('head-title')}</h2>
                    <div className={cls.DesktopInputParent}>
                        <div className={cls.InputContainer}>
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
            {children}
        </>
    );
}
