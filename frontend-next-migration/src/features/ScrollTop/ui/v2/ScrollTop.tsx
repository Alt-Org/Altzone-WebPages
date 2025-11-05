'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useCurrentYPosition } from '@/shared/lib/hooks';
import upUpIcon from '@/shared/assets/icons/UpUp arrows.svg';
import cls from './ScrollTop.module.scss';

interface ScrollTopProps {
    className?: string;
}

export const ScrollTop = memo(({ className = '' }: ScrollTopProps) => {
    const currentYPosition = useCurrentYPosition();

    const handleButtonClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        // Show button after scrolling down 100px
        if (currentYPosition > 100) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    }, [currentYPosition]);

    useEffect(() => {
        // Keep ScrollTop above minimized CookieConsent: set CSS var to bar height
        const root = document.documentElement;
        const CSS_VAR = '--cookie-consent-offset';

        const getBar = (): HTMLElement | null => {
            // Match CookieConsent V2/V3 wrappers using CSS Modules generated class names
            return document.querySelector('[class*="cookieConsentV2"]') as HTMLElement | null;
        };

        const ROOT_VISIBLE_CLASS = 'cookie-consent-visible';
        const updateOffset = (bar: HTMLElement | null) => {
            let height = 0;
            if (bar) {
                const rect = bar.getBoundingClientRect();
                const style = window.getComputedStyle(bar);
                const isVisible =
                    style.display !== 'none' &&
                    style.visibility !== 'hidden' &&
                    rect.height > 0 &&
                    rect.width > 0;
                height = isVisible ? Math.round(rect.height) : 0;
            }

            root.style.setProperty(CSS_VAR, `${height - 80}px`);
            // Toggle a helper class so we can raise z-index only while bar is present
            if (height > 0) {
                root.classList.add(ROOT_VISIBLE_CLASS);
                root.style.setProperty(CSS_VAR, `${height - 150}px`);
            } else {
                root.classList.remove(ROOT_VISIBLE_CLASS);
            }
        };

        let resizeObs: ResizeObserver | null = null;
        let mutationObs: MutationObserver | null = null;

        const setup = () => {
            const bar = getBar();
            updateOffset(bar);
            if (bar && 'ResizeObserver' in window) {
                resizeObs = new ResizeObserver(() => updateOffset(bar));
                resizeObs.observe(bar);
            }
        };

        setup();

        // Watch for bar mount/unmount or class changes (minimized/full)
        mutationObs = new MutationObserver(() => {
            const bar = getBar();
            updateOffset(bar);
            if (bar && resizeObs && (resizeObs as any)._observed !== bar) {
                // Reconnect observer in case element changed
                resizeObs.disconnect();
                resizeObs.observe(bar);
            }
        });
        mutationObs.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style'],
        });

        // Fallback: periodic poll to be extra safe on older browsers
        const pollId = window.setInterval(() => updateOffset(getBar()), 1500);

        return () => {
            root.style.removeProperty(CSS_VAR);
            if (resizeObs) resizeObs.disconnect();
            if (mutationObs) mutationObs.disconnect();
            window.clearInterval(pollId);
        };
    }, []);

    return (
        <button
            data-testid="scroll-to-top-btn"
            className={classNames(cls.ScrollTop, { [cls.show]: showButton }, [className])}
            onClick={handleButtonClick}
            aria-label="Scroll to top"
        >
            <Image
                src={upUpIcon}
                alt="double chevron pointing up"
                width={32}
                height={32}
                draggable={false}
            />
        </button>
    );
});

ScrollTop.displayName = 'ScrollTop';
