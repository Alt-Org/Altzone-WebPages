'use client';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { ReactNode } from 'react';

interface ScrollToSectionButtonProps {
    children: ReactNode;
    className: string;
    scrollToId: string;
}

export const ScrollToSectionButton = (props: ScrollToSectionButtonProps) => {
    const { children, className, scrollToId } = props;

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Button
            onClick={() => scrollToSection(scrollToId)}
            className={className}
            withScalableLink={true}
            size={ButtonSize.L}
            theme={ButtonTheme.BACKGROUND}
        >
            <b>{children}</b>
        </Button>
    );
};
