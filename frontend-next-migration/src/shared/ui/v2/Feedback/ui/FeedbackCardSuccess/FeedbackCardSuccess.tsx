import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useClientTranslation } from '@/shared/i18n';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import FeedbackEmoji from '../FeedbackEmoji/FeedbackEmoji';
import cls from './FeedbackCardSuccess.module.scss';

interface FeedbackCardSuccessProps {
    className?: string;
    rating: number | undefined;
}

/**
 * FeedbackCardSuccess renders the post-submission view of the feedback card.
 * Shows the selected emoji rating, a thank-you title, and links to full feedback forms.
 */
export default function FeedbackCardSuccess({ className = '', rating }: FeedbackCardSuccessProps) {
    const { t } = useClientTranslation('feedbackCard');

    return (
        <div className={`${cls.successCard} ${className}`}>
            <h3 className={cls.successTitle}>{t('success-title')}</h3>
            <FeedbackEmoji
                listClassName={cls.emojiList}
                value={rating}
                onImageClick={() => {}}
            />
            <span className={cls.linkToFormLabel}>{t('feedback-text')}</span>
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
                    />
                </a>
            </div>
        </div>
    );
}
