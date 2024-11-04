import { ReactNode } from 'react';
import { _NavbarForHelperRoute } from './_NavbarForHelperRoute';
import { Footer } from '@/widgets/Footer';

type Props = {
    children: ReactNode;
};

export default function HelperLayout({ children }: Props) {
    return (
        <>
            <_NavbarForHelperRoute />
            {children}
            <Footer />
        </>
    );
}
