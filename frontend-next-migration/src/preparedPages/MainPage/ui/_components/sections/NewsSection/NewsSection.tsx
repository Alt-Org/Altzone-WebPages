'use client';
import { Container } from '@/shared/ui/Container';
import cls from './NewsSection.module.scss'; // uusi SCSS-tiedosto

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
                                <img
                                    src={'sfs'}
                                    alt="Placeholder"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};
