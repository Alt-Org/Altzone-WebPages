'use client';
import { useState } from 'react';
import cls from './About.module.scss';
import { useGetMembersCountQuery, useGetDemographicsQuery, getBehindYears } from '@/entities/About';
import { DropdownWrapper } from '@/shared/ui/DropdownWrapperV2/ui/DropdownWrapper';
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

    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    return (
        <main className={cls.main}>
            <div className={cls.aboutContent}>
                <p
                    className={cls.h1}
                    id={cls.History}
                >
                    {storytitle}
                </p>

                <div className={cls.containerTop}>
                    <p className={cls.statsTitle}>{title}</p>

                    <div className={cls.headergrid}>
                        <div className={cls.statItem}>
                            <p className={cls.sValues}>{isLoading ? '...' : projectCount}</p>
                            <p className={cls.gridp}>{project}</p>
                        </div>

                        <div className={`${cls.statItem} ${cls.statItemNarrow}`}>
                            <p className={cls.sValues}>
                                {isLoading ? '...' : demographics.localities}
                            </p>
                            <p className={cls.gridp}>{locality}</p>
                        </div>

                        <div className={`${cls.statItem} ${cls.statItemNarrow}`}>
                            <p className={cls.sValues}>
                                {isLoading ? '...' : demographics.nationalities}
                            </p>
                            <p className={cls.gridp}>{nationality}</p>
                        </div>

                        <div className={cls.statItem}>
                            <p className={cls.sValues}>{behindCount}</p>
                            <p className={cls.gridp}>{behind}</p>
                        </div>
                    </div>
                </div>

                <div className={cls.containerBottom}>
                    <div className={cls.sortContainer}>
                        <DropdownWrapper
                            dynamicTitle="Järjestä"
                            showArrow
                            autoClose
                            className={cls.timelineSortDropdown}
                            headerClassName={cls.timelineSortHeader}
                            contentClassName={cls.timelineSortContent}
                            contentItemClassName={cls.timelineSortItem}
                            elements={[
                                {
                                    elementText: 'Uusin ensin',
                                    active: sortOrder === 'desc',
                                    onClickCallback: () => setSortOrder('desc'),
                                },
                                {
                                    elementText: 'Vanhin ensin',
                                    active: sortOrder === 'asc',
                                    onClickCallback: () => setSortOrder('asc'),
                                },
                            ]}
                        />
                    </div>

                    <div
                        className={`${cls.storygrid} ${
                            sortOrder === 'desc' ? cls.timelineNewest : cls.timelineOldest
                        }`}
                        id={cls.line}
                    >
                        <Timeline
                            sortOrder={sortOrder}
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
            </div>
        </main>
    );
};

export default About;
