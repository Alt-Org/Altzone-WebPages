'use client';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddFeedbackMutation, Feedback } from '@/entities/Feedback';
import { CustomForm } from '@/shared/ui/CustomForm';
import send from '@/shared/assets/icons/Feedback/Email Send.png';
import { useClientTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import cls from './FeedbackCard.module.scss';
import FeedbackEmoji from '../FeedbackEmoji/FeedbackEmoji';

export default function FeedbackCard() {
    const { t } = useClientTranslation('feedbackCard');
    const [feedback, setFeedback] = useState<string>('');
    const [feedbackEmoji, setFeedbackEmoji] = useState<number>();

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
            <FeedbackEmoji
                listClassName={cls.emojiList}
                value={feedbackEmoji}
                onImageClick={setFeedbackEmoji}
            />

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
                        {t('send')}
                        <Image
                            src={send.src}
                            alt="Send feedback icon"
                            width={20}
                            height={20}
                        />{' '}
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
                            color: '#FFA101',
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
                            color: '#FFA101',
                        }}
                    />
                </a>
            </div>
        </CustomForm>
    );
}
