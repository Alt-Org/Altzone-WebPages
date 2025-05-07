'use client';
import React, { ReactNode } from 'react';
import { ScrollBottomButton as ScrollBottomButtonExternal } from '@/features/ScrollBottom';
import { StaticImageData } from 'next/image';

interface ScrollToSectionButtonProps {
    text?: string;
    className: string;
    IdToScrollBeforePlay: string;
    image?: StaticImageData;
}

export const ScrollBottomButton = (props: ScrollToSectionButtonProps) => {
    const { text, IdToScrollBeforePlay, className, image } = props;

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
            image={image}
        />
    );
};
