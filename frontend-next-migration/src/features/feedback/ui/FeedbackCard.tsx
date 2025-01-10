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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function FeedbackCard() {
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

    const [addFeedback, { isLoading }] = useAddFeedbackMutation();
    const showToast = (message: string, type: 'success' | 'error') => {
        if (type === 'success') {
            toast.success(message, { position: 'bottom-center', autoClose: 3000 });
        } else {
            toast.error(message, { position: 'bottom-center', autoClose: 3000 });
        }
    };

    const submitFeedback = async () => {
        if (!feedback || !feedbackEmoji) {
            showToast(t('error'), 'error');
            return;
        }

        try {
            const feedbackData: Feedback = {
                feedbackText: feedback,
                rating: feedbackEmoji,
            };
            await addFeedback(feedbackData).unwrap();

            showToast(t('success'), 'success');
            setFeedback('');
            setFeedbackEmoji(undefined);
        } catch {
            showToast(t('error-submit-failed'), 'error');
        }
    };

    return (
        <CustomForm
            className={cls.feedbackForm}
            onSubmit={async (event) => {
                event.preventDefault();
                await submitFeedback();
            }}
        >
            <h3 className={cls.feedbackTitle}>{t('title')}</h3>
            <div className={cls.feedbackEmojies}>
                {emojies?.map((image, index) => (
                    <Image
                        src={image.src}
                        alt={`Feedback Emoji ${image.value}`}
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
                    onChange: (event) => setFeedback(event.target.value),
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
            <div className={cls.linkToFormContainer}>
                <a
                    className={cls.linkToForm}
                    href={AppExternalLinks.googleWebFeedback}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('href-to-webform')}
                    <FontAwesomeIcon
                        className={cls.externalLinkIcon}
                        size={'2xs'}
                        icon={faExternalLink}
                        style={{
                            display: 'inline',
                            verticalAlign: 'middle',
                            marginLeft: '5px',
                            color: 'var(--inverted-primary-color)',
                        }}
                    />
                </a>
                <a
                    className={cls.linkToForm}
                    href={AppExternalLinks.googleFeedback}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('href-to-gameform')}
                    <FontAwesomeIcon
                        className={cls.externalLinkIcon}
                        size={'2xs'}
                        icon={faExternalLink}
                        style={{
                            display: 'inline',
                            verticalAlign: 'middle',
                            marginLeft: '5px',
                            color: 'var(--inverted-primary-color)',
                        }}
                    />
                </a>
            </div>
        </CustomForm>
    );
}
