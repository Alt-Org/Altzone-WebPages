'use client';
import type { SocialIconLink } from '@/shared/types';

interface Props {
    className?: string;
    socialIconLinks: SocialIconLink[];
}

export const HeaderMobile = ({ className }: Props) => {
    return <header className={className}>Header mobile</header>;
};
