import { BlockSection } from '../types';
import cls from './Block.module.scss';

interface Props {
    block: BlockSection;
}

export const Block = (props: Props) => {
    const { block } = props;

    return (
        <div className={cls.Container}>
            <h2>{block.label}</h2>
            <p>{block.description}</p>
            <a
                href={block.link}
                target="_blank"
                rel="noreferrer"
            >
                {block.linkText}
            </a>
        </div>
    );
};
