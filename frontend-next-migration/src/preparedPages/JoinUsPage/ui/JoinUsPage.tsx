import cls from './JoinUsPage.module.scss';
import { Container } from '@/shared/ui/Container';

export interface Props {
    title: string;
}

export const JoinUsPage = (props: Props) => {
    const { title } = props;
    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>{title}</h1>
            </Container>
        </div>
    );
};
