'use client';
import { ReactNode } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import Image from 'next/image';
import cls from './FeedbackSideButton.module.scss';
import feedBackIcon from './FeedBackIcon1.svg';

type Props = {
    // The button does not display on mobile devices
    disableMobile?: boolean;
    feedbackIcon?: ReactNode;
};

export const FeedbackSideButton = (props: Props) => {
    const {
        disableMobile = true,
        feedbackIcon = (
            <Image
                src={feedBackIcon}
                width={48}
                height={48}
                alt="Feed-Back-Icon"
            />
        ),
    } = props;

    const { t } = useClientTranslation('translation');

    const { isMobileSize } = useIsMobileSize();

    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.googleFeedback);
    };

    return (
        (!isMobileSize || !disableMobile) && (
            <Button
                theme={ButtonTheme.Graffiti}
                className={cls.SideButton}
                type="button"
                onClick={handleClick}
            >
                <div className={cls.ContentWrapper}>
                    <div className={cls.Text}>{t('Feedback')}</div>
                    <div className={cls.Icon}>{feedbackIcon}</div>
                </div>
            </Button>
        )
    );
};
