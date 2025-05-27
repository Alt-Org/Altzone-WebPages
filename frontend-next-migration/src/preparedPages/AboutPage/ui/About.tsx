'use client';
import cls from './About.module.scss';

export interface Props {
    title: string;
    description: string;
    keywords: string;
    storytitle: string;
    project: string;
    locality: string;
    nationality: string;
    behind: string;
    V2019: string;
    V2020: string;
    V2021: string;
    V2022: string;
    V2023: string;
    V2024: string;
}

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
        V2019,
        V2020,
        V2021,
        V2022,
        V2023,
        V2024,
    } = props;

    return (
        <main className={cls.main}>
            <div className={cls.container}>
                <p className={cls.h1}>{title}</p>
                <p className={cls.gridp}>{description}</p>
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
                <p
                    className={cls.h1}
                    id={cls.History}
                >
                    {storytitle}
                </p>
                <div
                    className={cls.storygrid}
                    id={cls.line}
                >
                    <p className={cls.yearh1}>2019</p>
                    <p className={cls.p}>{V2019}</p>

                    <p className={cls.yearh1}>2020</p>
                    <p className={cls.p}>{V2020}</p>

                    <p className={cls.yearh1}>2021</p>
                    <p className={cls.p}>{V2021}</p>

                    <p className={cls.yearh1}>2022</p>
                    <p className={cls.p}>{V2022}</p>

                    <p className={cls.yearh1}>2023</p>
                    <p className={cls.p}>{V2023}</p>

                    <p className={cls.yearh1}>2024</p>
                    <p className={cls.p}>{V2024}</p>
                </div>
            </div>
        </main>
    );
};

export default About;
