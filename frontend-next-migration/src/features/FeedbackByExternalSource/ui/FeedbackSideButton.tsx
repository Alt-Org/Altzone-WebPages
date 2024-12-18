'use client';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import { useState } from 'react';
import cls from './FeedbackSideButton.module.scss';
import { FeedbackCard } from '@/features/feedback';

type Props = {
    disableMobile?: boolean;
};

export const FeedbackSideButton = (props: Props) => {
    const { disableMobile = true } = props;

    const { t } = useClientTranslation('translation');
    const { isMobileSize } = useIsMobileSize();

    // State for controlling FeedbackCard visibility
    const [isFeedbackVisible, setFeedbackVisible] = useState(false);

    const handleButtonClick = () => {
        setFeedbackVisible(!isFeedbackVisible);
    };

    return (
        (!isMobileSize || !disableMobile) && (
            <>
                <Button
                    theme={ButtonTheme.Graffiti}
                    className={cls.SideButton}
                    type="button"
                    onClick={handleButtonClick}
                >
                    {t('feedback')}
                </Button>

                {/* Render FeedbackCard if visible */}
                {isFeedbackVisible && (
                    <div className={cls.FeedbackOverlay}>
                        <div className={cls.FeedbackCardContainer}>
                            <FeedbackCard onClose={() => setFeedbackVisible(false)} />
                        </div>
                    </div>
                )}
            </>
        )
    );
};
