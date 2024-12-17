import { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import { FurnitureLayout } from '@/preparedPages/FurniturePages';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return (
        <FurnitureLayout>
            {children}
            <ScrollTop />
        </FurnitureLayout>
    );
}
