/**
 * HeaderMain selects the correct header variant (desktop/mobile) based on viewport size.
 *
 * Responsibilities:
 * - Renders the site header UI only (navigation / brand / social links).
 * - Does not render any hero images or intro animations.
 *
 * Notes:
 * - Social links are provided from shared constants to keep header/footer consistent.
 */

'use client';
import useSizes from '@/shared/lib/hooks/useSizes';
import { socialIconLinks } from '@/shared/const/socialSectionMenu';
import { HeaderDesktop } from '@/shared/ui/v2/Header';
import { HeaderMobile } from '../HeaderMobile/HeaderMobile';

interface Props {
    className?: string;
}

export const HeaderMain = ({ className }: Props) => {
    const { isMobileSize, isTabletSize } = useSizes();
    const isTouchSize = isMobileSize || isTabletSize;

    return isTouchSize ? (
        <HeaderMobile
            className={className}
            socialIconLinks={socialIconLinks}
        />
    ) : (
        <HeaderDesktop
            className={className}
            socialIconLinks={socialIconLinks}
        />
    );
};
