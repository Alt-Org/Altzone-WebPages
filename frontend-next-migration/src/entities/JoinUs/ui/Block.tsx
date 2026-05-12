import type { BlockSection } from '../types';
import cls from './Block.module.scss';

/**
 * Block Component
 *
 * Renders a single block element containing an image, title, description, and multiple links.
 *
 * @param {Props} props - Props containing a single block of type BlockSection.
 * @returns {JSX.Element} A rendered block element with image, text, and links.
 */

interface Props {
    block: BlockSection;
    reverse?: boolean;
}

export const Block = (props: Props) => {
    const { block, reverse = false } = props;

    return (
        <div
            className={`${cls.Container} ${reverse ? cls.Reverse : ''}`}
            data-testid="block"
        >
            <div className={cls.ImageWrapper}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className={cls.Image}
                    src={block.img}
                    alt={block.imgAlt}
                />
            </div>

            <div className={cls.Content}>
                <h2>{block.label}</h2>

                <p className={cls.multilineText}>{block.description}</p>

                <div className={cls.linkWrapper}>
                    {block.links.map((link, index) => (
                        <div
                            key={index}
                            className={cls.linkWrapper}
                        >
                            <a
                                href={link.url}
                                target={link.isExternal ? '_blank' : undefined}
                                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                            >
                                {link.iconSrc && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={link.iconSrc}
                                        alt={`${link.text} icon`}
                                        className={cls.icon}
                                    />
                                )}

                                {link.text}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
