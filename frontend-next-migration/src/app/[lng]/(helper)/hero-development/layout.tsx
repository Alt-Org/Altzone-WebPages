import { ReactNode } from 'react';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';

type Props = {
    children: ReactNode;
};

export default function HeroDevelopmentLayout({ children }: Props) {
    return (
        <>
            {children}
            <FeedbackSideButton />
        </>
    );
}
