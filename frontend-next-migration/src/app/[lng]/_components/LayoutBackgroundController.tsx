/**
 * LayoutBackgroundController is a client wrapper for LayoutWithBackground.
 * Not strictly required anymore
 */

'use client';
import { ReactNode } from 'react';
import { LayoutWithBackground } from '@/preparedPages/Layouts';

type Props = {
    children: ReactNode;
};

export function LayoutBackgroundController({ children }: Props) {
    return <LayoutWithBackground>{children}</LayoutWithBackground>;
}
