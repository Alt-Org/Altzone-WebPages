import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import { AiDisclaimer } from './AiDisclaimer';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

const translations = {
    title: 'Tekoälyn käyttö ALT Zonessa',
    lead: 'Käytämme tekoälyä osana kehitystyötä.',
    detail: 'Tarkempi kuvaus tekoälyn käytöstä julkaistaan sivustolla myöhemmin.',
};

describe('AiDisclaimer', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: keyof typeof translations) => translations[key],
        });
    });

    it('renders the localized AI disclaimer', () => {
        render(<AiDisclaimer />);

        expect(useClientTranslation).toHaveBeenCalledWith('ai-disclaimer');
        expect(screen.getByRole('heading', { name: translations.title })).toBeInTheDocument();
        expect(screen.getByText(translations.lead)).toBeInTheDocument();
        expect(screen.getByText(translations.detail)).toBeInTheDocument();
    });
});
