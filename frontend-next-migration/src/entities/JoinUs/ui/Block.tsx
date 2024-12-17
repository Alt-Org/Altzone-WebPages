import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { BlockSection } from '../types';
import cls from './Block.module.scss';

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
                className={cls.link}
                isExternal={true}
                to={block.link}
            >
                {block.linkText}
            </AppLink>
        </div>
    );
};
