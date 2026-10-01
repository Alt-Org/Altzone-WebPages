import { Member } from '@/entities/Member/model/types/types';
import cls from './MosaicGrid.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import Image from 'next/image';
import useSizes from '@/shared/lib/hooks/useSizes';
import { useMemo } from 'react';
import { envHelper } from '@/shared/const/envHelper';
import altLogo from '@/shared/assets/images/altLogo.png';
import { useClientTranslation } from '@/shared/i18n';

const SCROLL_HIGHLIGHT_DURATION = 2000;
const SCROLL_SETTLE_TIMEOUT = 3000;
const SCROLL_SETTLE_TOLERANCE = 8;
const SCROLL_POLL_INTERVAL = 50;

const getTargetScrollPosition = (element: HTMLElement): number => {
    const viewportHeight = window.innerHeight;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
    const rect = element.getBoundingClientRect();
    const centered = rect.top + window.scrollY - (viewportHeight - rect.height) / 2;
    return Math.min(Math.max(centered, 0), maxScroll);
};

const waitForScrollArrival = (targetScrollY: number, onArrived: () => void) => {
    const startTime = performance.now();
    const tick = (time: number) => {
        if (
            time - startTime >= SCROLL_SETTLE_TIMEOUT ||
            Math.abs(window.scrollY - targetScrollY) <= SCROLL_SETTLE_TOLERANCE
        ) {
            onArrived();
            return;
        }
        requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

const highlightMember = (element: HTMLElement) => {
    element.removeAttribute('data-highlight');
    void element.offsetHeight;
    element.setAttribute('data-highlight', 'true');
    window.setTimeout(() => element.removeAttribute('data-highlight'), SCROLL_HIGHLIGHT_DURATION);
};

export interface MosaicGridProps {
    className?: string;
    members: Member[];
}

const MosaicGrid = ({ className, members }: MosaicGridProps) => {
    const { isMobileSize } = useSizes();
    const { t } = useClientTranslation('members');
    const directusBaseUrl = envHelper.directusHost;

    const scrollToMember = (memberId: number) => {
        const element = document.getElementById(`member-${memberId}`);
        if (!element) return;
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        const targetScrollY = getTargetScrollPosition(element);
        waitForScrollArrival(targetScrollY, () => highlightMember(element));
    };

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
                    <button
                        key={`${member.id}-${index}`}
                        type="button"
                        className={cls.MosaicGridButton}
                        onClick={() => scrollToMember(member.id)}
                        aria-label={t('go-to-member', { name: member.name })}
                    >
                        <Image
                            src={imageSrc}
                            alt={member.name}
                            className={classNames(cls.MosaicGridImage)}
                            width={252}
                            height={252}
                        />
                    </button>
                ) : null;
            })}
        </div>
    );
};

export { MosaicGrid };
