'use client';
import { useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import { FeedbackCard } from '@/shared/ui/v2/Feedback/index';
import cls from './FeedbackSideButton.module.scss';

type Props = {
    disableMobile?: boolean;
};

const FeedbackSideButton = (props: Props) => {
    const { disableMobile = true } = props;

    const { t } = useClientTranslation('translation');
    const { isMobileSize } = useIsMobileSize();
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
                {isFeedbackVisible && (
                    <div className={cls.FeedbackOverlay}>
                        <div className={cls.FeedbackCardContainer}>
                            <FeedbackCard />
                        </div>
                    </div>
                )}
            </>
        )
    );
};

export default FeedbackSideButton;
