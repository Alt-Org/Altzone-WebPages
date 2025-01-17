import { ReactNode } from 'react';
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
        </LayoutWithSidebars>
    );
}
