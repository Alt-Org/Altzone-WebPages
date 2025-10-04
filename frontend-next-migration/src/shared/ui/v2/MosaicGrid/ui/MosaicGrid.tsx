import { Member } from '@/entities/Member/model/types/types';
import cls from './MosaicGrid.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Image from 'next/image';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useMemo } from 'react';
import { envHelper } from '@/shared/const/envHelper';
import altLogo from '@/shared/assets/images/altLogo.png';

export interface MosaicGridProps {
    className?: string;
    members: Member[];
}

const MosaicGrid = ({ className, members }: MosaicGridProps) => {
    const { isMobileSize } = useSizes();
    const directusBaseUrl = envHelper.directusHost;

    // shuffle members to fill the grid randomly
    const shuffledMembers = useMemo(() => {
        const shuffled = [...members];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }, [members]);

    // Determine grid configuration based on screen size and number of members
    const rows = isMobileSize ? 3 : members.length < 14 ? 2 : 3;
    const cols = isMobileSize ? 3 : 7;
    const totalSlots = rows * cols;

    // Fill the grid with members, repeating if necessary
    const filledMembers = Array.from({ length: totalSlots }, (_, arrayIndex) => {
        if (shuffledMembers.length === 0) return null;
        const memberIndex = arrayIndex % shuffledMembers.length;
        return shuffledMembers[memberIndex];
    }).filter(Boolean);

    return (
        <div
            className={classNames(
                cls.MosaicGrid,
                {
                    [cls.Mobile]: isMobileSize,
                    [cls.Desktop]: !isMobileSize,
                    [cls.Rows2]: !isMobileSize && rows === 2,
                    [cls.Rows3]: !isMobileSize && rows === 3,
                },
                [className ? className : ''],
            )}
        >
            {filledMembers.map((member, index) => {
                const imageSrc = member?.portrait
                    ? `${directusBaseUrl}/assets/${member.portrait.id}`
                    : altLogo;
                return member ? (
                    <Image
                        key={`${member.id}-${index}`}
                        src={imageSrc}
                        alt={member.name}
                        className={classNames(cls.MosaicGridImage)}
                        width={252}
                        height={252}
                    />
                ) : null;
            })}
        </div>
    );
};

export { MosaicGrid };
