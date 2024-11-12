import cls from './JoinUsPage.module.scss';
import { Container } from '@/shared/ui/Container';
import { SectionJoinUs } from '@/widgets/SectionJoinUs';
import { BlockSection } from '../types';

export interface Props {
    title: string;
    discordBlock: BlockSection;
    redditBlock: BlockSection;
    instagramBlock: BlockSection;
    teachersBlock: BlockSection;
    feedbackBlock: BlockSection;
    duunitoriBlock: BlockSection;
}

export const JoinUsPage = (props: Props) => {
    const {
        title,
        discordBlock,
        redditBlock,
        instagramBlock,
        teachersBlock,
        feedbackBlock,
        duunitoriBlock,
    } = props;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>{title}</h1>
                <SectionJoinUs
                    blocks={[
                        discordBlock,
                        redditBlock,
                        instagramBlock,
                        feedbackBlock,
                        teachersBlock,
                        duunitoriBlock,
                    ]}
                />
            </Container>
        </div>
    );
};
