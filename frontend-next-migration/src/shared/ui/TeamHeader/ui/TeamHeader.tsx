import { useClientTranslation } from '@/shared/i18n';
import cls from './TeamHeader.module.scss';
import Image, { StaticImageData } from 'next/image';
import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import useSizes from '@/shared/lib/hooks/useSizes';

type Props = {
    image: StaticImageData;
    dropdown?: ReactNode;
};

export function TeamHeader(props: Props) {
    const { image, dropdown } = props;
    const { t } = useClientTranslation('members');
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchDevice = isMobileSize || isTabletSize;

    return (
        <div className={cls.HeaderContainer}>
            {!isTouchDevice && <div className={cls.emptyContainer} />}
            <div className={cls.dataContainer}>
                <div className={cls.TitleContainer}>
                    <h2>{t('head-title')}</h2>
                    {isTouchDevice && dropdown}
                    {/* <div className={cls.InputParent}>
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
                    </div> */}
                </div>
                <div className={cls.ImageContainer}>
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
        </div>
    );
}
