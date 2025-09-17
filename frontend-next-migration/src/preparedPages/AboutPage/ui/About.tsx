'use client';
import cls from './About.module.scss';
import chevronDown from '@/shared/assets/icons/chevronDown.svg';
import Image from 'next/image';
import heroTop from '@/shared/assets/images/aboutPage/hero-top.png';
import img2019 from '@/shared/assets/images/aboutPage/about2019.png';
import img2020 from '@/shared/assets/images/aboutPage/about2020.png';
import img2021 from '@/shared/assets/images/aboutPage/about2021.png';
import img2022 from '@/shared/assets/images/aboutPage/about2022.png';
import img2023 from '@/shared/assets/images/aboutPage/about2023.png';
import img2024 from '@/shared/assets/images/aboutPage/about2024.png';
import { useGetMembersQuery, useGetDemographicsQuery, getBehindYears } from '@/entities/About';

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

    const { data: projectCount = 0, isLoading: membersLoading } = useGetMembersQuery();
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
                <p className={`${cls.h1}`}>{title}</p>
                <p className={cls.gridp}>{description}</p>
                <p className={`${cls.h1}`}>{keywords}</p>
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
                    className={`${cls.h1}`}
                    id={cls.History}
                >
                    {storytitle}
                </p>
                <div
                    className={cls.storygrid}
                    id={cls.line}
                >
                    <p className={cls.yearh1}>2019</p>
                    <div>
                        <div className={cls.yearImgWrap}>
                            <Image
                                src={img2019}
                                alt="2019 year image"
                                fill
                                className={cls.yearImg}
                                sizes="(max-width: 768px) 94vw, 34vw"
                            />
                        </div>
                        <p className={cls.p}>{V2019}</p>
                    </div>

                    <p className={cls.yearh1}>2020</p>
                    <div>
                        <div className={cls.yearImgWrap}>
                            <Image
                                src={img2020}
                                alt="2020 year image"
                                fill
                                className={cls.yearImg}
                                sizes="(max-width: 768px) 94vw, 34vw"
                            />
                        </div>
                        <p className={cls.p}>{V2020}</p>
                    </div>

                    <p className={cls.yearh1}>2021</p>
                    <div>
                        <div className={cls.yearImgWrap}>
                            <Image
                                src={img2021}
                                alt="2021 year image"
                                fill
                                className={cls.yearImg}
                                sizes="(max-width: 768px) 94vw, 34vw"
                            />
                        </div>
                        <p className={cls.p}>{V2021}</p>
                    </div>

                    <p className={cls.yearh1}>2022</p>
                    <div>
                        <div className={cls.yearImgWrap}>
                            <Image
                                src={img2022}
                                alt="2022 year image"
                                fill
                                className={cls.yearImg}
                                sizes="(max-width: 768px) 94vw, 34vw"
                            />
                        </div>
                        <p className={cls.p}>{V2022}</p>
                    </div>

                    <p className={cls.yearh1}>2023</p>
                    <div>
                        <div className={cls.yearImgWrap}>
                            <Image
                                src={img2023}
                                alt="2023 year image"
                                fill
                                className={cls.yearImg}
                                sizes="(max-width: 768px) 94vw, 34vw"
                            />
                        </div>
                        <p className={cls.p}>{V2023}</p>
                    </div>

                    <p className={cls.yearh1}>2024</p>
                    <div>
                        <div className={cls.yearImgWrap}>
                            <Image
                                src={img2024}
                                alt="2024 year image"
                                fill
                                className={cls.yearImg}
                                sizes="(max-width: 768px) 94vw, 34vw"
                            />
                        </div>
                        <p className={cls.p}>{V2024}</p>
                    </div>

                    <Image
                        loading="eager"
                        alt={'Chevron'}
                        src={chevronDown}
                        className={cls.chevronImage}
                        width={50}
                    />
                </div>
            </div>
        </main>
    );
};

export default About;
