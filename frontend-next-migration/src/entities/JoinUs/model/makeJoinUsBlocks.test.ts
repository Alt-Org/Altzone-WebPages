import { makeBlocksWithI18n } from './makeJoinUsBlocks';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';

describe('makeJoinUsBlocks', () => {
    /**
     * Mock translation function used for testing
     */
    const mockTranslation = (key: string): string => {
        const translations: Record<string, string> = {
            'block-label-discord': 'Discord',
            'block-description-discord': 'Join our Discord community.',
            'block-link-text-discord': 'Go to Discord',
            'block-image-alt-discord': 'Discord Icon',

            'block-label-reddit': 'Reddit',
            'block-description-reddit': 'Follow us on Reddit.',
            'block-link-text-reddit': 'Go to Reddit',
            'block-image-alt-reddit': 'Reddit Icon',
        };

        return translations[key] || key;
    };

    it('should generate a Discord block with correct translations', () => {
        const makeDiscordBlock = makeBlocksWithI18n('discord', [
            { text: 'discord', url: AppExternalLinks.discord, isExternal: true },
        ]);

        const block = makeDiscordBlock(mockTranslation);

        expect(block).toEqual({
            label: 'Discord',
            description: 'Join our Discord community.',
            links: [
                {
                    text: 'Go to Discord',
                    url: AppExternalLinks.discord,
                    isExternal: true,
                    iconSrc: undefined,
                },
            ],
            img: '',
            imgAlt: 'Discord Icon',
        });
    });

    it('should generate a Reddit block with correct translations', () => {
        const makeRedditBlock = makeBlocksWithI18n('reddit', [
            { text: 'reddit', url: AppExternalLinks.reddit, isExternal: true },
        ]);

        const block = makeRedditBlock(mockTranslation);

        expect(block).toEqual({
            label: 'Reddit',
            description: 'Follow us on Reddit.',
            links: [
                {
                    text: 'Go to Reddit',
                    url: AppExternalLinks.reddit,
                    isExternal: true,
                    iconSrc: undefined,
                },
            ],
            img: '',
            imgAlt: 'Reddit Icon',
        });
    });
});
