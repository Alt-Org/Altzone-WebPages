import { ReactNode } from 'react';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';

export default function PictureGalleryLayout({ children }: { children: ReactNode }) {
    return (
        <>
            {children}
            <FeedbackSideButton />
        </>
    );
}
