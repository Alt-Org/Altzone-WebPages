'use client';
import { ReactNode } from 'react';
import { ComingSoon } from '@/widgets/ComingSoon';

export type Props = {
    title: string;
    text: ReactNode;
};

const HeroDevelopmentPage = (props: Props) => {
    return (
        <main>
            <ComingSoon />
        </main>
    );
};

export default HeroDevelopmentPage;
