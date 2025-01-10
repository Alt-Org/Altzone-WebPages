import { ReactNode } from 'react';
import { HorizontalLines } from '@/shared/ui/PageDividers';

type Props = {
    children: ReactNode;
};

export default function ComingLayout({ children }: Props) {
    return (
        <>
            {children}
            <HorizontalLines />
        </>
    );
}
