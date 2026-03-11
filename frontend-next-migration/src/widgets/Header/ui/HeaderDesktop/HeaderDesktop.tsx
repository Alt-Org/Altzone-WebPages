import { HeaderDesktop as HeaderDesktopV2 } from '@/shared/ui/v2/Header';
import type { SocialIconLink } from '@/shared/types';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

export const HeaderDesktop = (props: Props) => {
    return <HeaderDesktopV2 {...props} />;
};
