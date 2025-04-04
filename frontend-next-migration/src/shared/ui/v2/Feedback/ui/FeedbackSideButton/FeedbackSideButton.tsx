'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button/Button';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import megafone from '@/shared/assets/icons/Feedback/Megafone.svg';
import FeedbackCard from '../FeedbackCard/FeedbackCard';
import cls from './FeedbackSideButton.module.scss';

type Props = {
    disableMobile?: boolean;
};

const FeedbackSideButton = (props: Props) => {
    const { disableMobile = true } = props;

    const { t } = useClientTranslation('translation');
    const { isMobileSize } = useIsMobileSize();
    const [isFeedbackVisible, setFeedbackVisible] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const feedbackRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        setFeedbackVisible(!isFeedbackVisible);
    };

    useEffect(() => {
        const handleMouseEvent = (event: MouseEvent) => {
            if (
                !feedbackRef.current?.contains(event.target as Node) &&
                !buttonRef.current?.contains(event.target as Node)
            ) {
                setFeedbackVisible(false);
            }
        };
        if (isFeedbackVisible) {
            document.addEventListener('mousedown', handleMouseEvent);
        }
        return () => {
            document.removeEventListener('mousedown', handleMouseEvent);
        };
    }, [isFeedbackVisible]);

    return (
        (!isMobileSize || !disableMobile) && (
            <>
                <div
                    className={cls.feedbackButtonContainer}
                    ref={buttonRef}
                >
                    <Button
                        theme={ButtonTheme.CLEAR}
                        square={false}
                        size={ButtonSize.L}
                        className={isFeedbackVisible ? cls.activeButton : cls.nonActiveButton}
                        type="button"
                        onClick={handleButtonClick}
                    >
                        {t('feedback')}
                        <Image
                            src={megafone}
                            alt={'megafone'}
                            width={25}
                            height={25}
                            className={cls.megafone}
                        />
                    </Button>
                </div>
                {isFeedbackVisible && (
                    <div className={cls.FeedbackOverlay}>
                        <div
                            ref={feedbackRef}
                            className={cls.FeedbackCardContainer}
                        >
                            <FeedbackCard />
                        </div>
                    </div>
                )}
            </>
        )
    );
};

export default FeedbackSideButton;
