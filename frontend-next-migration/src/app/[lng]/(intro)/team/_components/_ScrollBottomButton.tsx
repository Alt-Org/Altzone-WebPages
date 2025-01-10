'use client';
import React, { ReactNode } from 'react';
import { ScrollBottomButton as ScrollBottomButtonExternal } from '@/features/ScrollBottom';

interface ScrollToSectionButtonProps {
    text: string;
    className: string;
    IdToScrollBeforePlay: string;
}

export const ScrollBottomButton = (props: ScrollToSectionButtonProps) => {
    const { text, IdToScrollBeforePlay, className } = props;

    const scrollToSection = () => {
        const element = document.getElementById(IdToScrollBeforePlay);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <ScrollBottomButtonExternal
            key={'somekey'}
            onBeforePlay={scrollToSection}
            className={className}
            text={text}
        />
    );
};
