import { render, screen } from '@testing-library/react';
import HeroGroupNavMenu from './HeroGroupNavMenu';
import { useGetHeroGroupsQuery } from '@/entities/Hero/model/heroApi';
import { useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
    usePathname: () => '/en/defense-gallery/RETROFLECTOR',
    useParams: jest.fn(() => ({ lng: 'en' })),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@/entities/Hero/model/heroApi', () => ({
    useGetHeroGroupsQuery: jest.fn(),
}));

jest.mock('@/entities/Hero/model/initializeHeroGroups', () => ({
    initializeHeroGroups: () => ({
        RETROFLECTOR: { name: 'Static group', heroes: [] },
    }),
}));

jest.mock('@/shared/ui/NavMenuWithDropdownsV2', () => ({
    NavMenuWithDropdowns: ({
        title,
        dropdownItems,
    }: {
        title: string;
        dropdownItems: { elementText: string }[];
    }) => (
        <div>
            <span>{title}</span>
            {dropdownItems.map((item) => (
                <span key={item.elementText}>{item.elementText}</span>
            ))}
        </div>
    ),
}));

const mockedUseGetHeroGroupsQuery = jest.mocked(useGetHeroGroupsQuery);
const mockedUseParams = jest.mocked(useParams);

describe('HeroGroupNavMenu', () => {
    it('uses static groups when Directus fails', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({ isError: true } as unknown as ReturnType<
            typeof useGetHeroGroupsQuery
        >);

        render(<HeroGroupNavMenu />);

        expect(screen.getByText('Static group')).toBeInTheDocument();
    });

    it('uses published Directus groups when the request succeeds', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isError: false,
            data: { RETROFLECTOR: { name: 'directus group', heroes: [] } },
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<HeroGroupNavMenu />);

        expect(screen.getByText('Directus group')).toBeInTheDocument();
    });

    it('keeps the navigation empty after a successful empty response', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isError: false,
            data: undefined,
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<HeroGroupNavMenu />);

        expect(screen.queryByText('Static group')).not.toBeInTheDocument();
    });

    it.each(['fi', 'ru'])('maps the %s route locale for Directus', (lng) => {
        mockedUseParams.mockReturnValue({ lng });
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isError: false,
            data: {},
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<HeroGroupNavMenu />);

        expect(mockedUseGetHeroGroupsQuery).toHaveBeenLastCalledWith({ locale: lng });
    });

    it('defaults to English and handles an empty group name', () => {
        mockedUseParams.mockReturnValue({});
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isError: false,
            data: { RETROFLECTOR: { name: '', heroes: [] } },
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<HeroGroupNavMenu />);

        expect(mockedUseGetHeroGroupsQuery).toHaveBeenLastCalledWith({ locale: 'en' });
    });
});
