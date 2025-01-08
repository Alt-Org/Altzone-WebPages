import { ReactNode } from 'react';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import { LayoutWithSidebars } from '@/preparedPages/Layouts';
import { HeroDevelopmentSidebar } from '@/features/NavigateHeroes';

type Props = {
    children: ReactNode;
};

export default function HeroDevelopmentLayout({ children }: Props) {
    return (
        <LayoutWithSidebars
            leftTopSidebar={{
                component: <HeroDevelopmentSidebar />,
            }}
        >
            {children}
            <FeedbackSideButton />
        </LayoutWithSidebars>
    );
}
