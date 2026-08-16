import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import chevronDown from '@/shared/assets/icons/chevronDown.svg';
import cls from './About.module.scss';

interface TimelineEntryProps {
    year: number;
    text: string;
    image?: StaticImageData | null;
    sortOrder: 'asc' | 'desc';
    isFirst: boolean;
    isLast: boolean;
}

const TimelineEntry = ({ year, text, image, sortOrder, isFirst, isLast }: TimelineEntryProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`${cls.timelineCard} ${
                isFirst && sortOrder === 'desc' ? cls.timelineStart : ''
            } ${isLast && sortOrder === 'asc' ? cls.timelineEnd : ''}`}
        >
            <div
                className={cls.timelineHeader}
                onClick={() => setIsOpen(!isOpen)}
            >
                <p className={cls.yearh1}>{year}</p>

                <Image
                    src={chevronDown}
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden="true"
                    className={`${cls.chevron} ${isOpen ? cls.chevronOpen : ''}`}
                />
            </div>

            {isOpen && (
                <div className={cls.timelineBody}>
                    {image && (
                        <div className={cls.yearImgWrap}>
                            <Image
                                src={image}
                                alt={`${year} year image`}
                                fill
                                className={cls.yearImg}
                                sizes="(max-width: 768px) 94vw, 34vw"
                            />
                        </div>
                    )}

                    <p className={cls.p}>{text}</p>
                </div>
            )}
        </div>
    );
};

export default TimelineEntry;
