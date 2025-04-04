import { ReactNode } from 'react';
import { Footer } from '@/widgets/Footer';
import { Navbar } from '@/widgets/Navbar';
import LayoutDefault from '../../../preparedPages/Layouts/ui/LayoutDefault/LayoutDefault';

type Props = {
    children: ReactNode;
};

export default function HelperLayout({ children }: Props) {
    // TODO: Check how this solution is bad for semantics; it was added as a hotfix for the jumping footer
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <div style={{ flex: 1 }}>
                <LayoutDefault>{children}</LayoutDefault>
            </div>
            <Footer />
        </div>
    );
}
