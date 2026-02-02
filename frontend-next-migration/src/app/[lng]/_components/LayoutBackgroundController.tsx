/**
 * LayoutBackgroundController is a client wrapper for LayoutWithBackground.
 *
 * Purpose:
 * - Allows controlling background behavior in a Client Component without converting RootLayout into a client component.
 *
 * Current behavior:
 * - Always enables the background texture.
 *
 * Note:
 * - Keep route-based logic here (if needed later), not in RootLayout, to avoid breaking server-only exports.
 */

'use client';
import { ReactNode } from 'react';
import { LayoutWithBackground } from '@/preparedPages/Layouts';

type Props = {
    children: ReactNode;
    lng: string;
};

export function LayoutBackgroundController({ children }: Props) {
    return <LayoutWithBackground>{children}</LayoutWithBackground>;
}
