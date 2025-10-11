'use client';
import Image from 'next/image';
import { Container } from '@/shared/ui/Container';
import cls from './NewsSection.module.scss';

export type Props = {
    mainTitle?: string;
};

export const NewsSection = (props: Props) => {
    return (
        <section className={cls.Section}>
            <Container className={cls.Container}>
                <h2 className={cls.mainTitle}>{props.mainTitle}</h2>
                <div className={cls.grid}>
                    <h2 className={cls.title} />
                    {[1, 2].map((_, index) => (
                        <div
                            className={cls.card}
                            key={index}
                        >
                            <div className={cls.cardContent}>
                                <h2 className={cls.cardTitle}>H2 Heading</h2>
                                <p className={cls.cardBody}>
                                    Body (primary text)
                                    <br />
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                                <small className={cls.cardFooter}>
                                    Small Text/Footnotes. Date and time
                                </small>
                            </div>
                            <div className={cls.cardImage}>
                                <Image
                                    src="/sfs"
                                    alt="Placeholder"
                                    width={150}
                                    height={150}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
