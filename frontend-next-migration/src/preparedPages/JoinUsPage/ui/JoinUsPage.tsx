import cls from './JoinUsPage.module.scss';
import { Container } from '@/shared/ui/Container';
import { SectionJoinUs } from '@/widgets/SectionJoinUs';
import { BlockSection } from '../types';

export interface Props {
    title: string;
    getInTouchAndFollowBlock: BlockSection;
    communityAndOpportunitiesBlock: BlockSection;
    educationProfessionalsBlock: BlockSection;
    feedbackBlock: BlockSection;
    navHeight?: number;
}

export const JoinUsPage = (props: Props) => {
    const {
        title,
        getInTouchAndFollowBlock,
        communityAndOpportunitiesBlock,
        educationProfessionalsBlock,
        feedbackBlock,
    } = props;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <div>
                    <h1>{title}</h1>
                </div>

                <SectionJoinUs
                    blocks={[
                        getInTouchAndFollowBlock,
                        communityAndOpportunitiesBlock,
                        educationProfessionalsBlock,
                        feedbackBlock,
                    ]}
                />
            </Container>
        </div>
    );
};
