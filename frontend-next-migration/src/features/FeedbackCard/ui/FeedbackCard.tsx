'use client';
import { CustomForm } from '@/shared/ui/CustomForm';
import cls from './FeedbackCard.module.scss';
import AngerEmoji from '@/shared/assets/icons/Feedback/AngerChatEmoticon.png';
import JoyEmoji from '@/shared/assets/icons/Feedback/JoyChatEmoticon.png';
import LoveEmoji from '@/shared/assets/icons/Feedback/LoveChatEmoticon.png';
import PlayfulEmoji from '@/shared/assets/icons/Feedback/PlayfulChatEmoticon.png';
import SadEmoji from '@/shared/assets/icons/Feedback/SadnessChatEmoticon.png';
import send from '@/shared/assets/icons/Feedback/Email Send.png';
import { useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';

/**
 * FeedbackCard component for rendering a basic feedback card.
 *
 * @returns {JSX.Element} - The rendered feedback card component.
 *
 * @example
 * <FeedbackCard/>
 */

export function FeedbackCard() {
    const { t } = useClientTranslation('feedbackCard');

    const [feedback, setFeedback] = useState<string>('');
    const [feedbackEmoji, setFeedbackEmoji] = useState<number>();

    const emojies = [
        { src: AngerEmoji.src, value: 1 },
        { src: SadEmoji.src, value: 2 },
        { src: PlayfulEmoji.src, value: 3 },
        { src: JoyEmoji.src, value: 4 },
        { src: LoveEmoji.src, value: 5 },
    ];

    const submitFeedback = () => {
        //Submit feedback here
    };

    return (
        <CustomForm
            className={cls.feedbackForm}
            onSubmit={(event) => {
                event.preventDefault();
                submitFeedback();
            }}
        >
            <h3 className={cls.feedbackTitle}>{t('title')}</h3>
            <div className={cls.feedbackEmojies}>
                {emojies?.map((image, index) => (
                    <img
                        src={image.src}
                        alt={`emoji-${image.value}`}
                        key={index}
                        className={image.value === feedbackEmoji ? cls.selectedEmoji : cls.emoji}
                        onClick={() => setFeedbackEmoji(image.value)}
                    />
                ))}
            </div>
            <CustomForm.InputField
                label=""
                className={cls.textInput}
                inputProps={{
                    placeholder: t('input-placeholder'),
                    onChange: (e) => setFeedback(e.target.value),
                }}
            />
            <CustomForm.Button
                className={cls.feedbackButton}
                type="submit"
            >
                {' '}
                <img src={send.src} />
                {t('send')}
            </CustomForm.Button>
            <a
                className={cls.linkToForm}
                href={AppExternalLinks.googleFeedback}
            >
                {t('href-to-fullform')}
            </a>
        </CustomForm>
    );
}
