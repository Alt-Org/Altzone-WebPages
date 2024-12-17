import { ReactNode } from 'react';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { HorizontalLines } from '@/shared/ui/PageDividers';

type Props = {
    children: ReactNode;
};

export default function ComingLayout({ children }: Props) {
    return (
        <>
            {children}
            <FeedbackSideButton />
            <HorizontalLines />
        </>
    );
}
