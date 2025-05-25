import { Block } from '@/entities/JoinUs';
import { Container } from '@/shared/ui/Container';
import { BlockSection } from '../types';
import cls from './SectionJoinUs.module.scss';

/**
 * Props for the SectionJoinUs component.
 *
 * @param {BlockSection[]} blocks - An array of blocks to display, each containing label, description, links, and image.
 */

interface Props {
    blocks: BlockSection[];
}

/**
 * SectionJoinUs Component
 *
 * Renders a section that displays multiple Block components inside a Container.
 *
 * @param {Props} props - The props containing an array of blocks.
 *
 * @returns {JSX.Element} The rendered SectionJoinUs component.
 */

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
