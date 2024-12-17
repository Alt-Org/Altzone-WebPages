import { Block } from '@/entities/JoinUs';
import { Container } from '@/shared/ui/Container';
import { BlockSection } from '../types';
import cls from './SectionJoinUs.module.scss';

interface Props {
    blocks: BlockSection[];
}

export const SectionJoinUs = (props: Props) => {
    const { blocks } = props;
    return (
        <Container
            as={'section'}
            className={cls.Container}
        >
            {blocks.map((block, index) => (
                <Block
                    key={index}
                    block={block}
                />
            ))}
        </Container>
    );
};
