'use client';
import useSizes from '@/shared/lib/hooks/useSizes';
import { socialIconLinks } from '@/shared/const/socialSectionMenu';
import { HeaderDesktop } from '../HeaderDesktop/HeaderDesktop';
import { HeaderMobile } from '../HeaderMobile/HeaderMobile';
import { WallIntroAnimation } from '@/shared/ui/v2/WallIntroAnimation';

interface Props {
    className?: string;
}

export const HeaderMain = ({ className }: Props) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchSize = isMobileSize || isTabletSize;

    return (
        <>
            <WallIntroAnimation renderOnce />

            {isTouchSize ? (
                <HeaderMobile
                    className={className}
                    socialIconLinks={socialIconLinks}
                />
            ) : (
                <HeaderDesktop
                    className={className}
                    socialIconLinks={socialIconLinks}
                />
            )}
        </>
    );
};
