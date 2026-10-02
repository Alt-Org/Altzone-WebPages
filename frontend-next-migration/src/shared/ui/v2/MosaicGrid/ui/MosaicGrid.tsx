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

/**
 * works out how far to scroll to put an element in the middle of the screen
 * @description same maths as `block: 'center'` in scrollIntoView, so we can check
 * when the smooth scroll has actually landed. clamped to whatever the page can
 * really scroll to.
 * @param {HTMLElement} element - the element we want in view
 * @returns {number} the scrollY value that centres it
 */
const getTargetScrollPosition = (element: HTMLElement): number => {
    const viewportHeight = window.innerHeight;
    const maxScroll = Math.max(0, document.documentElement.scrollHeight - viewportHeight);
    const rect = element.getBoundingClientRect();
    const centered = rect.top + window.scrollY - (viewportHeight - rect.height) / 2;
    return Math.min(Math.max(centered, 0), maxScroll);
};

/**
 * runs a callback once the page has stopped scrolling
 * @description smooth scrolling doesn't tell you when it's done, so we just check
 * every animation frame until we're close enough to where we wanted to go. gives
 * up after a timeout in case we never get there.
 * @param {number} targetScrollY - where we ended up wanting to scroll to
 * @param {() => void} onArrived - what to run once scrolling has settled
 */
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

/**
 * gives a member row a quick glow so you can see where you ended up
 * @description sets `data-highlight`, which kicks off the `member-highlight`
 * animation in MemberItem.module.scss. we strip the attribute and force a
 * repaint first, otherwise clicking the same portrait twice won't restart it.
 * @param {HTMLElement} element - the member row to highlight
 */
const highlightMember = (element: HTMLElement) => {
    element.removeAttribute('data-highlight');
    void element.offsetHeight;
    element.setAttribute('data-highlight', 'true');
    window.setTimeout(() => element.removeAttribute('data-highlight'), SCROLL_HIGHLIGHT_DURATION);
};

/**
 * props for the MosaicGrid component
 * {Object} MosaicGridProps
 * @property {string} [className] - extra class name(s) for the grid
 * @property {Member[]} members - members to show as clickable portraits
 */
export interface MosaicGridProps {
    className?: string;
    members: Member[];
}

const MosaicGrid = ({ className, members }: MosaicGridProps) => {
    const { isMobileSize } = useSizes();
    const { t } = useClientTranslation('members');
    const directusBaseUrl = envHelper.directusHost;

    /**
     * scrolls down to a member's row and gives it a highlight once we get there
     * @description uses the id SectionMembers puts on the member's first row.
     * does nothing if there's no match, so portraits on pages without a member
     * list just sit there instead of blowing up.
     * @param {number} memberId - the Directus id of the member we're after
     */
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
