'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { LayoutWithBackground } from '@/preparedPages/Layouts';

type Props = {
    children: ReactNode;
    lng: string;
};

export function LayoutBackgroundController({ children, lng }: Props) {
    const pathname = usePathname();
    const isHome = pathname === `/${lng}`;

    return <LayoutWithBackground showBackground={!isHome}>{children}</LayoutWithBackground>;
}
