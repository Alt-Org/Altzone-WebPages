import { render, screen } from '@testing-library/react';
import { LangSwitcher } from './LangSwitcher'; // Adjust the import to your file structure
import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18n from 'i18next';

// Mock i18next instance
i18n.use(initReactI18next).init({
    lng: 'fi',
    resources: {
        en: {
            translation: {
                FIN: 'Finnish',
                ENG: 'English',
            },
        },
        fi: {
            translation: {
                FIN: 'Suomi',
                ENG: 'Englanti',
            },
        },
    },
});

describe('LangSwitcher', () => {
    beforeEach(() => {
        render(
            <I18nextProvider i18n={i18n}>
                <LangSwitcher />
            </I18nextProvider>,
        );
    });

    it('renders the correct language options', () => {
        const englishOption = screen.getByText('Englanti');
        expect(englishOption).toBeInTheDocument(); // Ensures 'Englanti' (for English) is present

        const russianOption = screen.getByText('RU');
        expect(russianOption).toBeInTheDocument(); // Ensures 'RU' is present for Russian
    });
});
