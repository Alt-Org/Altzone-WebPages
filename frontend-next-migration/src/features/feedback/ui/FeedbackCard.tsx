'use client';
import { CustomForm } from '@/shared/ui/CustomForm';
import cls from './FeedbackCard.module.scss';
import Image from 'next/image';
import AngerEmoji from '@/shared/assets/icons/Feedback/AngerChatEmoticon.png';
import JoyEmoji from '@/shared/assets/icons/Feedback/JoyChatEmoticon.png';
import LoveEmoji from '@/shared/assets/icons/Feedback/LoveChatEmoticon.png';
import PlayfulEmoji from '@/shared/assets/icons/Feedback/PlayfulChatEmoticon.png';
import SadEmoji from '@/shared/assets/icons/Feedback/SadnessChatEmoticon.png';
import send from '@/shared/assets/icons/Feedback/Email Send.png';
import { useState } from 'react';
import { useClientTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { useAddFeedbackMutation } from '@/entities/Feedback/api/feedbackApi';
import { Feedback } from '@/entities/Feedback/model/types/types';

export default function FeedbackCard() {
    const { t } = useClientTranslation('feedbackCard');

    // State management for user feedback
    const [feedback, setFeedback] = useState<string>('');
    const [feedbackEmoji, setFeedbackEmoji] = useState<number>();

    const emojies = [
        { src: AngerEmoji.src, value: 1 },
        { src: SadEmoji.src, value: 2 },
        { src: PlayfulEmoji.src, value: 3 },
        { src: JoyEmoji.src, value: 4 },
        { src: LoveEmoji.src, value: 5 },
    ];

    const [addFeedback, { isLoading }] = useAddFeedbackMutation();

    const submitFeedback = async () => {
        if (!feedback || !feedbackEmoji) {
            alert(t('error-missing-data')); // Notify user if feedback or emoji is missing
            return;
        }

        try {
            const feedbackData: Feedback = {
                feedbackText: feedback, // Map `feedback` state to `feedbackText`
                rating: feedbackEmoji, // Map `feedbackEmoji` to `rating`
            };

            // Submit feedback to API
            await addFeedback(feedbackData).unwrap();

            alert(t('success-message')); // Success message
            setFeedback('');
            setFeedbackEmoji(undefined);
        } catch (error: any) {
            console.error('Error submitting feedback:', error);
            alert(t('error-submit-failed')); // Error message
        }
    };

    return (
        <CustomForm
            className={cls.feedbackForm}
            onSubmit={async (event) => {
                event.preventDefault(); // Prevent default form submission
                await submitFeedback(); // Await the asynchronous function
            }}
        >
            <h3 className={cls.feedbackTitle}>{t('title')}</h3>
            <div className={cls.feedbackEmojies}>
                {emojies?.map((image, index) => (
                    <Image
                        src={image.src}
                        alt={`Feedback Emoji ${image.value}`} // Descriptive alt text
                        key={index}
                        className={image.value === feedbackEmoji ? cls.selectedEmoji : cls.emoji}
                        onClick={() => setFeedbackEmoji(image.value)}
                        width={50}
                        height={32}
                    />
                ))}
            </div>
            <CustomForm.InputField
                label=""
                className={cls.textInput}
                inputProps={{
                    placeholder: t('input-placeholder'),
                    value: feedback,
                    onChange: (event) => setFeedback(event.target.value), // Use descriptive name
                }}
            />
            <CustomForm.Button
                className={cls.feedbackButton}
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? (
                    t('loading')
                ) : (
                    <>
                        <Image
                            src={send.src}
                            alt="Send feedback icon"
                            width={24}
                            height={24}
                        />{' '}
                        {t('send')}
                    </>
                )}
            </CustomForm.Button>
            <a
                className={cls.linkToForm}
                href={AppExternalLinks.googleFeedback}
                target="_blank"
                rel="noopener noreferrer"
            >
                {t('href-to-fullform')}
            </a>
        </CustomForm>
    );
}
