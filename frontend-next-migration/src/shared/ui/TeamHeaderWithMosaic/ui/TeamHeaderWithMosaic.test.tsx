import { render, screen } from '@testing-library/react';
import { useGetMembersQuery } from '@/entities/Member/api/membersApi';
import type { Member } from '@/entities/Member/model/types/types';
import { TeamHeaderWithMosaic } from './TeamHeaderWithMosaic';

jest.mock('@/entities/Member/api/membersApi', () => ({ useGetMembersQuery: jest.fn() }));
jest.mock('@/shared/i18n', () => ({
    useClientTranslation: () => ({ t: (key: string) => key }),
}));
jest.mock('@/shared/lib/hooks/useSizes', () => ({
    __esModule: true,
    default: () => ({ isMobileSize: false, isTabletSize: false }),
}));
jest.mock('../../PageTitle', () => ({ PageTitle: () => null }));
jest.mock('../../SkeletonLoader', () => ({ SkeletonLoaderWithHeader: () => null }));

const members: Member[] = Array.from({ length: 15 }, (_, id) => ({
    id,
    name: `Member ${id}`,
    portrait: { id: `portrait-${id}`, title: `Member ${id}` },
}));

describe('TeamHeaderWithMosaic', () => {
    beforeEach(() => {
        jest.mocked(useGetMembersQuery).mockReturnValue({
            data: members,
            isLoading: false,
            isError: false,
            refetch: jest.fn(),
        } as ReturnType<typeof useGetMembersQuery>);
    });

    afterEach(() => jest.restoreAllMocks());

    it('keeps the same portraits mounted during unrelated header updates', () => {
        const random = jest.spyOn(Math, 'random').mockReturnValue(0);
        const { rerender } = render(<TeamHeaderWithMosaic />);
        const portraits = screen.getAllByRole('img');
        const sources = portraits.map((image) => image.getAttribute('src'));

        expect(portraits).toHaveLength(21);
        random.mockReturnValue(0.999);
        rerender(<TeamHeaderWithMosaic className="updated-header" />);

        expect(screen.getAllByRole('img').map((image) => image.getAttribute('src'))).toEqual(
            sources,
        );
        screen.getAllByRole('img').forEach((image, index) => {
            expect(image).toBe(portraits[index]);
        });
    });

    it('updates the mosaic when the member data changes', () => {
        const { rerender } = render(<TeamHeaderWithMosaic />);
        const newMember = {
            id: 100,
            name: 'New member',
            portrait: { id: 'new-portrait', title: 'New member' },
        };
        jest.mocked(useGetMembersQuery).mockReturnValue({
            data: [newMember],
            isLoading: false,
            isError: false,
            refetch: jest.fn(),
        } as ReturnType<typeof useGetMembersQuery>);

        rerender(<TeamHeaderWithMosaic />);

        expect(screen.getAllByRole('img')).toHaveLength(14);
        screen.getAllByRole('img').forEach((image) => {
            expect(image).toHaveAttribute('alt', 'New member');
            expect(image.getAttribute('src')).toContain('/assets/new-portrait');
        });
    });
});
