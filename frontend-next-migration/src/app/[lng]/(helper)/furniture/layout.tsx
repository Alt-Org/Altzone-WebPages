import { ReactNode } from 'react';
import { FurnitureLayout } from '@/preparedPages/FurniturePages';

type Props = {
    children: ReactNode;
};

export default function Layout({ children }: Props) {
    return <FurnitureLayout>{children}</FurnitureLayout>;
}
