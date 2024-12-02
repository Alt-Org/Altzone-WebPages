import { ReactNode } from 'react';
import { Footer } from '@/widgets/Footer';
import { Navbar } from '@/widgets/Navbar';

type Props = {
    children: ReactNode;
};

export default function IntroLayout({ children }: Props) {
    // TODO: Check how this solution is bad for semantics; it was added as a hotfix for the jumping footer
    return (
        <>
            <Navbar />
            <div>{children}</div>
            <Footer />
        </>
    );
}
