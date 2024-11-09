import { ReactNode } from 'react';
import { _NavbarForHelperRoute } from './_NavbarForHelperRoute';
import { Footer } from '@/widgets/Footer';

type Props = {
    children: ReactNode;
};

export default function HelperLayout({ children }: Props) {
    // TODO: Check how this solution is bad for semantics; it was added as a hotfix for the jumping footer
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '130vh' }}>
            <_NavbarForHelperRoute />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
        </div>
    );
}
