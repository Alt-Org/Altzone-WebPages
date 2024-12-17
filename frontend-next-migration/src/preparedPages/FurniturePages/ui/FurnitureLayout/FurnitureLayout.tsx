import { ReactNode } from 'react';
import { ScrollTop } from '@/features/ScrollTop';
import { Container } from '@/shared/ui/Container';
import cls from './FurnitureLayout.module.scss';

type Props = {
    children: ReactNode;
};

export default function FurnitureLayout({ children }: Props) {
    return (
        <Container className={cls.Layout}>
            {children}
            <ScrollTop />
        </Container>
    );
}
