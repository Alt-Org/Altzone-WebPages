'use client';
import AngerEmoji from '@/shared/assets/icons/Feedback/AngerChatEmoticon.png';
import JoyEmoji from '@/shared/assets/icons/Feedback/JoyChatEmoticon.png';
import LoveEmoji from '@/shared/assets/icons/Feedback/LoveChatEmoticon.png';
import PlayfulEmoji from '@/shared/assets/icons/Feedback/PlayfulChatEmoticon.png';
import SadEmoji from '@/shared/assets/icons/Feedback/SadnessChatEmoticon.png';
import Image from 'next/image';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import cls from './FeedbackEmoji.module.scss';

/**
 * FeedbackEmoji component for rendering mapped list of emojies.
 *
 * @param {Props} props - The properties for the FeedbackEmoji.
 * @returns {JSX.Element} - The rendered input field component.
 *
 * @example
 *  const [feedbackEmoji, setFeedbackEmoji] = useState<number>();
 *  <FeedbackEmoji 
        className={cls.singlEmoji}
        value={feedbackEmoji}
        onImageClick={setFeedbackEmoji}
        listClassName={cls.emojiList}
    />
 */

type Props = {
    value: number | undefined;
    listClassName?: string;
    onImageClick: (value: number | undefined) => void;
};

const FeedbackEmoji = ({ listClassName = '', value, onImageClick }: Props) => {
    const { t } = useClientTranslation('feedbackCard');
    const emojies = [
        { src: AngerEmoji.src, value: 1 },
        { src: SadEmoji.src, value: 2 },
        { src: PlayfulEmoji.src, value: 3 },
        { src: JoyEmoji.src, value: 4 },
        { src: LoveEmoji.src, value: 5 },
    ];
    const RATING_LABELS: Record<number, string> = {
        1: t('rating-label-1'),
        2: t('rating-label-2'),
        3: t('rating-label-3'),
        4: t('rating-label-4'),
        5: t('rating-label-5'),
    };

    return (
        <div className={classNames(cls.emojiListContainer, {}, [listClassName])}>
            <div className={cls.emojiList}>
                {emojies.map((image: any, index: number) => (
                    <Image
                        src={image.src}
                        alt={`Feedback Emoji ${image.value}`}
                        key={index}
                        width={48}
                        height={48}
                        quality={100}
                        className={value === image.value ? cls.selectedEmoji : cls.Emoji}
                        onClick={() =>
                            value !== image.value
                                ? onImageClick(image.value)
                                : onImageClick(undefined)
                        }
                    />
                ))}
            </div>
            {value && (
                <div
                    className={cls.ratingLabel}
                    style={{
                        left: `calc(50% + ${(emojies.findIndex((emoji) => emoji.value === value) - 2) * 52}px)`,
                        transform: 'translateX(-50%)',
                    }}
                >
                    <p className={cls.ratingText}>{RATING_LABELS[value]}</p>
                </div>
            )}
        </div>
    );
};

export default FeedbackEmoji;
