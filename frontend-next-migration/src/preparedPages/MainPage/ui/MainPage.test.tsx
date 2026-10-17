import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import MainPage, { Props } from './MainPage';

jest.mock('next/navigation', () => ({
    useParams: () => ({ lng: 'fi' }),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/shared/lib/hooks/useSizes', () => () => ({ isMobileSize: false }));
jest.mock('@/entities/NewsV2', () => ({
    useGetNewsQuery: () => ({ data: [] }),
    formatNews: () => [],
}));
jest.mock('@/shared/const/envHelper', () => ({
    envHelper: { directusHost: '' },
}));
jest.mock('@/widgets/Header', () => ({ Header: () => null }));
jest.mock('@/widgets/NewsCard', () => ({ NewsCard: () => null }));
jest.mock('@/shared/ui/v2/WallIntroAnimation', () => ({
    WallIntroAnimation: () => null,
}));
jest.mock('@/shared/ui/v2/CardV2', () => ({ CardV2: () => null }));
jest.mock('./_components/sections/PlayWithUs', () => ({
    PlayWithUs: () => null,
}));
jest.mock('./_components/sections/ContactSection', () => ({
    ContactSection: () => null,
}));

const translations = {
    main: {
        'descriptionCard-title': 'Description card title',
        'descriptionCard-description': 'Description card text',
        'descriptionCard-button': 'Read more',
        'newsSection-title': 'News',
        'newsSection-seeMore': 'See more',
    },
    'ai-disclaimer': {
        title: 'Tekoälyn käyttö ALT Zonessa',
        lead: 'Käytämme tekoälyä osana kehitystyötä.',
        detail: 'Tarkempi kuvaus tekoälyn käytöstä julkaistaan sivustolla myöhemmin.',
    },
};

describe('MainPage', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockImplementation(
            (namespace: keyof typeof translations) => ({
                t: (key: keyof (typeof translations)[typeof namespace]) =>
                    translations[namespace][key],
            }),
        );
    });

    it('renders the localized AI disclaimer', () => {
        render(<MainPage {...({} as Props)} />);

        expect(
            screen.getByRole('heading', { name: translations['ai-disclaimer'].title }),
        ).toBeInTheDocument();
        expect(screen.getByText(translations['ai-disclaimer'].lead)).toBeInTheDocument();
        expect(screen.getByText(translations['ai-disclaimer'].detail)).toBeInTheDocument();
    });
});
