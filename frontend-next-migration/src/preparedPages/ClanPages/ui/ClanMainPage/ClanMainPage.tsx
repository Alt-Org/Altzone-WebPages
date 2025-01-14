'use client';
import { Container } from '@/shared/ui/Container';
import cls from './ClanMainPage.module.scss';
import ClanInfoTitle from './clanInfoTitle/ClanInfoTitle';

const ClanMainPage = ({ children }: any) => {
    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <div className={cls.ClansViewMain}>{children}</div>
            {/* just for test the component */}
                <ClanInfoTitle />
            </Container>
        </div>
    );
};

export default ClanMainPage;
