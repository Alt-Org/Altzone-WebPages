import { Footer } from '@/widgets/Footer';
import { ReactNode } from 'react';
import { HorizontalLines } from '@/shared/ui/HorizontalLines';
import cls from './Layout.module.scss';

interface Props {
    children?: ReactNode;
}

export default function Layout({ children }: Props) {
    return (
        <div className={cls.layout}>
            <div className={cls.content}>{children}</div>
            <HorizontalLines />
            <div className={cls.footer}>
                <Footer />
            </div>
        </div>
    );
}
