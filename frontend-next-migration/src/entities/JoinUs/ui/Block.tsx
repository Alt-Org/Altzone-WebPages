import { BlockSection } from '../types';
import cls from './Block.module.scss';
import { AppLink } from '@/shared/ui/AppLink/AppLink';

interface Props {
    block: BlockSection;
}

export const Block = (props: Props) => {
    const { block } = props;

    return (
        <div
            className={cls.Container}
            data-testid="block"
        >
            <h2>{block.label}</h2>
            <p>{block.description}</p>
            <AppLink
                isExternal={true}
                to={block.link}
            >
                {block.linkText}
            </AppLink>
        </div>
    );
};
