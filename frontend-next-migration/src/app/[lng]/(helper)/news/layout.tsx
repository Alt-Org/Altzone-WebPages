import { ReactNode } from 'react';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';

type Props = {
    children: ReactNode;
};

export default function NewsLayout({ children }: Props) {
    return (
        <>
            {children}
            <HorizontalLines />
        </>
    );
}
