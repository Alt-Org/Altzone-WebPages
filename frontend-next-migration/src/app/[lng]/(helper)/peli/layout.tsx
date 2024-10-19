import { ReactNode } from 'react';
import { Footer } from '@/widgets/Footer';

type Props = {
    children: ReactNode;
};

export default function GameLayout({ children }: Props) {
    return (
        <>
            <div style={{ paddingTop: '20px' }} />
            {children}
            <Footer />
        </>
    );
}
