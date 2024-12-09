'use client';
import React, { ReactNode } from 'react';
import { ScrollBottomButton as ScrollBottomButtonExternal } from '@/features/ScrollBottom';

interface ScrollToSectionButtonProps {
    children: ReactNode;
    className: string;
    IdToScrollBeforePlay: string;
}

export const ScrollBottomButton = (props: ScrollToSectionButtonProps) => {
    const { children, IdToScrollBeforePlay, className } = props;

    const scrollToSection = () => {
        const element = document.getElementById(IdToScrollBeforePlay);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <ScrollBottomButtonExternal
            onBeforePlay={scrollToSection}
            className={className}
            text={children}
        />
    );
};
