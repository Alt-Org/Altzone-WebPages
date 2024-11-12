import { makeBlocksWithI18n } from './makeJoinUsBlocks';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';

describe('makeJoinUsBlocks', () => {
    const mockTranslation = (key: string): string => {
        const translations: Record<string, string> = {
            'block-label-discord': 'Discord',
            'block-description-discord': 'Join our Discord community.',
            'block-link-text-discord': 'Go to Discord',
            'block-label-reddit': 'Reddit',
            'block-description-reddit': 'Follow us on Reddit.',
            'block-link-text-reddit': 'Go to Reddit',
        };

        return translations[key] || key;
    };

    it('should generate a Discord block with correct translations', () => {
        const makeDiscordBlock = makeBlocksWithI18n('discord', AppExternalLinks.discord);

        const block = makeDiscordBlock(mockTranslation);

        expect(block).toEqual({
            label: 'Discord',
            description: 'Join our Discord community.',
            link: AppExternalLinks.discord,
            linkText: 'Go to Discord',
        });
    });

    it('should generate a Reddit block with correct translations', () => {
        const makeRedditBlock = makeBlocksWithI18n('reddit', AppExternalLinks.reddit);

        const block = makeRedditBlock(mockTranslation);

        expect(block).toEqual({
            label: 'Reddit',
            description: 'Follow us on Reddit.',
            link: AppExternalLinks.reddit,
            linkText: 'Go to Reddit',
        });
    });
});
