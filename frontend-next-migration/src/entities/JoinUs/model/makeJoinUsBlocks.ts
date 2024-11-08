import { BlockSection } from '../types';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';

const makeBlocksWithI18n = (
    section: string,
    link: string,
): ((t: (key: string) => string) => BlockSection) => {
    return (t: (key: string) => string): BlockSection => {
        return {
            label: t(`block-label-${section}`),
            description: t(`block-description-${section}`),
            link: link,
            linkText: t(`block-link-text-${section}`),
        };
    };
};

export const makeDiscordBlock = makeBlocksWithI18n('discord', AppExternalLinks.discord);
export const makeRedditBlock = makeBlocksWithI18n('reddit', AppExternalLinks.reddit);
export const makeTeachersBlock = makeBlocksWithI18n('teachers', 'https://example.com/');
export const makeFeedbackBlock = makeBlocksWithI18n('feedback', AppExternalLinks.googleFeedback);
export const makeDuunitoriBlock = makeBlocksWithI18n('duunitori', AppExternalLinks.duunitori);
export const makeInstagramBlock = makeBlocksWithI18n('instagram', AppExternalLinks.instagram);
