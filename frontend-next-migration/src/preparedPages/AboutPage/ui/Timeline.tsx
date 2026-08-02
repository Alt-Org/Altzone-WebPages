import Image, { StaticImageData } from 'next/image';
import chevronDown from '@/shared/assets/icons/chevronDown.svg';
import img2019 from '@/shared/assets/images/aboutPage/about2019.png';
import img2020 from '@/shared/assets/images/aboutPage/about2020.png';
import img2021 from '@/shared/assets/images/aboutPage/about2021.png';
import img2022 from '@/shared/assets/images/aboutPage/about2022.png';
import img2023 from '@/shared/assets/images/aboutPage/about2023.png';
import img2024 from '@/shared/assets/images/aboutPage/about2024.png';
import cls from './About.module.scss';
import TimelineEntry from './TimelineEntry';

interface Props {
    sortOrder: 'asc' | 'desc';

    V2019: string;
    V2020: string;
    V2021: string;
    V2022: string;
    V2023: string;
    V2024: string;
    V2025: string;
    V2026: string;
}

interface TimelineItem {
    year: number;
    text: string;
    image: StaticImageData | null;
}

const Timeline = ({ sortOrder, V2019, V2020, V2021, V2022, V2023, V2024, V2025, V2026 }: Props) => {
    const timeline: TimelineItem[] = [
        { year: 2019, image: img2019, text: V2019 },
        { year: 2020, image: img2020, text: V2020 },
        { year: 2021, image: img2021, text: V2021 },
        { year: 2022, image: img2022, text: V2022 },
        { year: 2023, image: img2023, text: V2023 },
        { year: 2024, image: img2024, text: V2024 },
        { year: 2025, image: null, text: V2025 },
        { year: 2026, image: null, text: V2026 },
    ];

    const sortedTimeline = [...timeline].sort((a, b) =>
        sortOrder === 'desc' ? b.year - a.year : a.year - b.year,
    );

    return (
        <>
            {sortedTimeline.map((item) => (
                <TimelineEntry
                    key={item.year}
                    year={item.year}
                    text={item.text}
                    image={item.image}
                />
            ))}

            <Image
                loading="eager"
                alt="Chevron"
                src={chevronDown}
                className={cls.chevronImage}
                width={50}
            />
        </>
    );
};

export default Timeline;
