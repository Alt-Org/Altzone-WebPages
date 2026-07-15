'use client';
import cls from './About.module.scss';
import Image from 'next/image';
import heroTop from '@/shared/assets/images/aboutPage/hero-top.png';
import { useGetMembersCountQuery, useGetDemographicsQuery, getBehindYears } from '@/entities/About';
import Timeline from './Timeline';

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
    V2025: string;
    V2026: string;
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
        V2025,
        V2026,
    } = props;

    const { data: projectCount = 0, isLoading: membersLoading } = useGetMembersCountQuery();

    const {
        data: demographics = { localities: 0, nationalities: 0 },
        isLoading: demographicsLoading,
    } = useGetDemographicsQuery();

    const behindCount = getBehindYears();
    const isLoading = membersLoading || demographicsLoading;

    return (
        <main className={cls.main}>
            <section
                className={cls.hero}
                aria-label="About hero image"
            >
                <Image
                    src={heroTop}
                    alt="Hero Image"
                    fill
                    priority
                    className={cls.heroImg}
                    sizes="100vw"
                />
            </section>

            <div className={cls.containerTop}>
                <p className={cls.h1}>{title}</p>

                <p className={cls.gridp}>{description}</p>

                <p className={cls.h1}>{keywords}</p>

                <div className={cls.headergrid}>
                    <div>
                        <p className={cls.sValues}>{isLoading ? '...' : projectCount}</p>
                        <p className={cls.gridp}>{project}</p>
                    </div>

                    <div>
                        <p className={cls.sValues}>{isLoading ? '...' : demographics.localities}</p>
                        <p className={cls.gridp}>{locality}</p>
                    </div>

                    <div>
                        <p className={cls.sValues}>
                            {isLoading ? '...' : demographics.nationalities}
                        </p>
                        <p className={cls.gridp}>{nationality}</p>
                    </div>

                    <div>
                        <p className={cls.sValues}>{behindCount}</p>
                        <p className={cls.gridp}>{behind}</p>
                    </div>
                </div>
            </div>

            <div className={cls.containerBottom}>
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
                    <Timeline
                        V2019={V2019}
                        V2020={V2020}
                        V2021={V2021}
                        V2022={V2022}
                        V2023={V2023}
                        V2024={V2024}
                        V2025={V2025}
                        V2026={V2026}
                    />
                </div>
            </div>
        </main>
    );
};

export default About;
