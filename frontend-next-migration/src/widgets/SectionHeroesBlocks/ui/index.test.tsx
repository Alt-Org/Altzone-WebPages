import { render, screen } from '@testing-library/react';
import Main from './index';
import { useGetHeroGroupsQuery } from '@/entities/Hero/model/heroApi';
import { useParams } from 'next/navigation';

jest.mock('react-intersection-observer', () => ({
    useInView: () => ({ ref: jest.fn(), inView: false }),
}));

jest.mock('next/navigation', () => ({
    useParams: jest.fn(() => ({ lng: 'en' })),
}));

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock('@/entities/Hero/model/heroApi', () => ({
    useGetHeroGroupsQuery: jest.fn(),
}));

jest.mock('@/entities/Hero', () => ({
    HeroManager: jest.fn().mockImplementation(() => ({
        getGroupsWithHeroesAsArray: () => [
            { name: 'Static group', heroes: [], label: '', bgColour: '#000' },
        ],
    })),
}));

jest.mock('./heroesBlocks/HeroesBlocks', () => ({
    __esModule: true,
    default: ({ labelText }: { labelText: string }) => (
        <div data-testid="hero-group">{labelText}</div>
    ),
}));

jest.mock('@/shared/ui/Container', () => ({
    Container: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/shared/ui/Button', () => ({
    Button: jest
        .requireActual('react')
        .forwardRef(
            ({ children }: { children: React.ReactNode }, ref: React.Ref<HTMLButtonElement>) => (
                <button ref={ref}>{children}</button>
            ),
        ),
    ButtonSize: { XL: 'XL' },
    ButtonTheme: { Graffiti: 'Graffiti' },
}));

jest.mock('@/shared/ui/AppLink/AppLink', () => ({
    AppLink: ({ children }: { children: React.ReactNode }) => <a href="/">{children}</a>,
}));

const mockedUseGetHeroGroupsQuery = jest.mocked(useGetHeroGroupsQuery);
const mockedUseParams = jest.mocked(useParams);

describe('SectionHeroesBlocks', () => {
    it('renders no groups while Directus is loading', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({ isLoading: true } as unknown as ReturnType<
            typeof useGetHeroGroupsQuery
        >);

        render(<Main title="Heroes" />);

        expect(screen.queryByTestId('hero-group')).not.toBeInTheDocument();
    });

    it('uses static groups after a Directus error', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isLoading: false,
            isError: true,
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<Main title="Heroes" />);

        expect(screen.getByText('Static group')).toBeInTheDocument();
    });

    it('renders Directus groups and the see-more link after success', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: {
                RETROFLECTOR: { name: 'Directus group', heroes: [], label: '', bgColour: '#000' },
            },
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(
            <Main
                title="Heroes"
                seeMoreLink={{ href: '/heroes', text: 'See more' }}
                maxGroupsPerPage={1}
            />,
        );

        expect(screen.getByText('Directus group')).toBeInTheDocument();
        expect(screen.getByText('See more')).toBeInTheDocument();
    });

    it('keeps the group list empty after a successful empty response', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: undefined,
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<Main title="Heroes" />);

        expect(screen.queryByTestId('hero-group')).not.toBeInTheDocument();
    });

    it('does not limit groups when maxGroupsPerPage is zero', () => {
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: {
                RETROFLECTOR: { name: 'First group', heroes: [], label: '', bgColour: '#000' },
                DESENSITIZER: { name: 'Second group', heroes: [], label: '', bgColour: '#000' },
            },
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(
            <Main
                title="Heroes"
                maxGroupsPerPage={0}
            />,
        );

        expect(screen.getAllByTestId('hero-group')).toHaveLength(2);
    });

    it.each(['fi', 'ru'])('maps the %s route locale for Directus', (lng) => {
        mockedUseParams.mockReturnValue({ lng });
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: undefined,
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<Main title="Heroes" />);

        expect(mockedUseGetHeroGroupsQuery).toHaveBeenLastCalledWith({ locale: lng });
    });

    it('defaults to English when the route has no locale', () => {
        mockedUseParams.mockReturnValue({});
        mockedUseGetHeroGroupsQuery.mockReturnValue({
            isLoading: false,
            isError: false,
            data: undefined,
        } as unknown as ReturnType<typeof useGetHeroGroupsQuery>);

        render(<Main title="Heroes" />);

        expect(mockedUseGetHeroGroupsQuery).toHaveBeenLastCalledWith({ locale: 'en' });
    });
});
