'use client';
import { object, string } from 'yup';
import cls from './About.module.scss';
import { title } from 'process';

export interface Props {
    title: string;
    description: string;
    keywords: string;
    storytitle: string;
    project: string;
    locality: string;
    nationality: string;
    behind: string;
    story: string;
}

interface section {}

const About = (props: Props) => {
    const {
        title,
        description,
        keywords,
        storytitle,
        project,
        locality,
        nationality,
        behind,
        story,
    } = props;

    return (
        <main className={cls.main}>
            <div className={cls.container}>
                <p className={cls.h1}>{title}</p>
                <p className={cls.p}>{description}</p>
                <p className={cls.h1}>{keywords}</p>
                <div className={cls.headergrid}>
                    <div>
                        <p>10</p>
                        <p className={cls.gridp}>{project}</p>
                    </div>
                    <div>
                        <p>10</p>
                        <p className={cls.gridp}>{locality}</p>
                    </div>
                    <div>
                        <p>10</p>
                        <p className={cls.gridp}>{nationality}</p>
                    </div>
                    <div>
                        <p>10</p>
                        <p className={cls.gridp}>{behind}</p>
                    </div>
                </div>
            </div>
            <div className={cls.container}>
                <p className={cls.h1}>{storytitle}</p>
                <div
                    className={cls.storygrid}
                    id={cls.line}
                >
                    <p className={cls.yearh1}>2019</p>
                    <p className={cls.p}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry's standard dummy text ever since the
                        1500s, when an unknown printer took a galley of type and scrambled it to
                        make a type specimen book. It has survived not only five centuries, but also
                        the leap into electronic typesetting, remaining essentially unchanged. It
                        was popularised in the 1960s with the release of Letraset sheets containing
                        Lorem Ipsum passages, and more recently with desktop publishing software
                        like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>
                    <p className={cls.yearh1}>2020</p>
                    <p className={cls.p}>{story}</p>
                    <p className={cls.yearh1}>2021</p>
                    <p className={cls.p}>{story}</p>
                    <p className={cls.yearh1}>2022</p>
                    <p className={cls.p}>{story}</p>
                    <p className={cls.yearh1}>2023</p>
                    <p className={cls.p}>{story}</p>
                    <p className={cls.yearh1}>2024</p>
                    <p className={cls.p}>{story}</p>
                </div>
            </div>
        </main>
    );
};

export default About;
