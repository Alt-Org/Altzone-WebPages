'use client';
import { HeaderMobile as HeaderMobileV2 } from '@/shared/ui/v2/Header';
import type { SocialIconLink } from '@/shared/types';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

export const HeaderMobile = (props: Props) => {
    return <HeaderMobileV2 {...props} />;
};
