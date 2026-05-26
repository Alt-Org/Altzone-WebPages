'use client';
import { ReactNode } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useInView } from 'react-intersection-observer';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Cardv2.module.scss';
import { Glass } from '@/shared/ui/Glass';
import { Container } from '@/shared/ui/Container';

/**
 * Props for CardV2.
 *
 * @property {Array} images - the character images shown on the left
 * @property {string} title - the big title text
 * @property {string} [description] - smaller text under the title
 * @property {ReactNode} [actions] - buttons or links, optional
 * @property {string} [className] - extra css class if needed
 */
export type Props = {
    images: { src: StaticImageData | string; alt?: string }[];
    title: string;
    description?: string;
    actions?: ReactNode;
    className?: string;
};

/**
 * cardV2 is a section that shows characters on the left and text on the right.
 * on mobile the characters go below the text.
 *
 * @param {Props} props - the stuff passed into the component
 * @returns {JSX.Element} the section element
 *
 * @example
 * ```tsx
 * <CardV2
 *   images={[
 *     { src: char1, alt: 'Character 1' },
 *     { src: char2, alt: 'Character 2' },
 *   ]}
 *   title="Tutustu defenssisotureihin"
 *   description="Sielumme linnaa ympäröivät suuret ja vahvat muurit."
 *   actions={<Button path="/defense-gallery">Tutustu kaikkiin hahmoihin</Button>}
 * />
 * ```
 */
const CardV2 = (props: Props) => {
    const { images, title, description, actions, className } = props;

    const { ref, inView } = useInView({
        rootMargin: '-100px 0px',
        triggerOnce: true,
    });

    return (
        <section
            ref={ref}
            className={classNames(cls.CardV2, { [cls.inView]: inView }, [className])}
        >
            <Container className={cls.Inner}>
                <div className={cls.ImagesBlock}>
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className={cls.ImgWrapper}
                            style={{ zIndex: i === 1 ? 2 : 1 }}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt ?? ''}
                                fill
                                style={{ objectFit: 'contain', objectPosition: 'bottom' }}
                            />
                        </div>
                    ))}
                </div>

                <Glass className={cls.TextBlock}>
                    <h2 className={cls.Title}>{title}</h2>
                    {description && <p className={cls.Description}>{description}</p>}
                    {actions && <div className={cls.Actions}>{actions}</div>}
                </Glass>
            </Container>
        </section>
    );
};

export default CardV2;
