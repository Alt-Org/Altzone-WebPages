import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { BlockSection } from '../types';
import cls from './Block.module.scss';
import Image from 'next/image';

interface Props {
    block: BlockSection;
}

/*
export const Block = (props: Props) => {
    const { block } = props;

    return (
        <div
            className={cls.Container}
            data-testid="block"
        >
            <img src={block.img} alt={block.imgAlt} />
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
*/

export const Block = (props: Props) => {
    const { block } = props;

    return (
        <div
            className={cls.Container}
            data-testid="block"
        >
            <div className={cls.ImageWrapper}>
                <img
                    className={cls.Image}
                    src={block.img}
                    alt={block.imgAlt}
                />
            </div>
            <div className="text-container">
                <h2>{block.label}</h2>
                <p>{block.description}</p>
                {block.links.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Testilinkki
                    </a>
                ))}
            </div>
        </div>
    );
};
