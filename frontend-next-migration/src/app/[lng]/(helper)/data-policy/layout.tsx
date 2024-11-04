import { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <>
            {children}
            <ScrollTop />
        </>
    );
}
