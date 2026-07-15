import Image, { StaticImageData } from 'next/image';
import cls from './About.module.scss';

interface TimelineEntryProps {
    year: number;
    text: string;
    image?: StaticImageData | null;
}

const TimelineEntry = ({ year, text, image }: TimelineEntryProps) => {
    return (
        <>
            <p className={cls.yearh1}>{year}</p>

            <div>
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
        </>
    );
};

export default TimelineEntry;
