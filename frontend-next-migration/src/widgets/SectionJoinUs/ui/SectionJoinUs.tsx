import cls from './SectionJoinUs.module.scss';
import { Block } from '@/entities/JoinUs';
import { BlockSection } from '../types';

interface Props {
    blocks: BlockSection[];
}

export const SectionJoinUs = (props: Props) => {
    const { blocks } = props;
    return (
        <div className={cls.Container}>
            {blocks.map((block, index) => (
                <div
                    key={index}
                    className={cls.Item}
                >
                    <Block block={block} />
                </div>
            ))}
        </div>
    );
};
