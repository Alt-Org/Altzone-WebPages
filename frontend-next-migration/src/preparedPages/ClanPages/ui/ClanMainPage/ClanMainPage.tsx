'use client';
import { Container } from '@/shared/ui/Container';
import cls from './ClanMainPage.module.scss';

const ClanMainPage = ({ children }: any) => {
    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <div className={cls.ClansViewMain}>{children}</div>
            </Container>
        </div>
    );
};

export default ClanMainPage;
