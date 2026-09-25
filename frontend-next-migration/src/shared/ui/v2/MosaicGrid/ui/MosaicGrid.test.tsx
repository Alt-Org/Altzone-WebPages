import { fireEvent, render, screen } from '@testing-library/react';
import { MosaicGrid } from './MosaicGrid';
import { Member } from '@/entities/Member/model/types/types';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/shared/lib/hooks/useSizes', () => ({
    __esModule: true,
    default: jest.fn(() => ({ isMobileSize: false })),
}));

import { useClientTranslation } from '@/shared/i18n';
import useSizes from '@/shared/lib/hooks/useSizes';
import { envHelper } from '@/shared/const/envHelper';

const members: Member[] = [{ id: 1, name: 'Test Member' }];

const manyMembers: Member[] = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    name: `Member ${i + 1}`,
}));

const renderMosaic = (props: React.ComponentProps<typeof MosaicGrid>) =>
    render(<MosaicGrid {...props} />);

describe('MosaicGrid', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        (useSizes as jest.Mock).mockReturnValue({ isMobileSize: false });
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: string, options?: { name?: string }) =>
                key === 'go-to-member' ? `Go to ${options?.name}` : key,
        });
    });

    it('renders a clickable portrait button with an accessible aria-label', () => {
        renderMosaic({ members });

        expect(screen.getAllByRole('button', { name: 'Go to Test Member' }).length).toBeGreaterThan(
            0,
        );
    });

    it('renders the same number of buttons as filled mobile slots (3x3)', () => {
        (useSizes as jest.Mock).mockReturnValue({ isMobileSize: true });
        renderMosaic({ members });

        expect(screen.getAllByRole('button', { name: 'Go to Test Member' })).toHaveLength(9);
    });

    it('renders 2 rows of 7 slots on desktop when there are fewer than 14 members', () => {
        renderMosaic({ members });

        expect(screen.getAllByRole('button', { name: 'Go to Test Member' })).toHaveLength(14);
    });

    it('renders 3 rows of 7 slots on desktop when there are 14 or more members', () => {
        renderMosaic({ members: manyMembers });

        expect(screen.getAllByRole('button')).toHaveLength(21);
    });

    it('renders no buttons when there are no members', () => {
        renderMosaic({ members: [] });

        expect(screen.queryAllByRole('button')).toHaveLength(0);
    });

    it('uses the portrait asset URL as the image source when a portrait exists', () => {
        const memberWithPortrait: Member = {
            id: 7,
            name: 'Portrait Member',
            portrait: { id: 'abc', title: 'portrait' },
        };
        renderMosaic({ members: [memberWithPortrait] });

        expect(screen.getAllByRole('img', { name: 'Portrait Member' }).length).toBeGreaterThan(0);
        expect(screen.getAllByRole('img', { name: 'Portrait Member' })[0]).toHaveAttribute(
            'src',
            `${envHelper.directusHost}/assets/abc`,
        );
    });

    it('scrolls to the member row smoothly when the portrait is clicked', () => {
        const scrollIntoView = jest.fn();
        Object.defineProperty(Element.prototype, 'scrollIntoView', {
            configurable: true,
            value: scrollIntoView,
        });
        document.body.innerHTML = '<div id="member-1"></div>';

        renderMosaic({ members });
        fireEvent.click(screen.getAllByRole('button', { name: 'Go to Test Member' })[0]);

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });

    it('does nothing when the member row does not exist in the page', () => {
        const scrollIntoView = jest.fn();
        Object.defineProperty(Element.prototype, 'scrollIntoView', {
            configurable: true,
            value: scrollIntoView,
        });

        renderMosaic({ members });
        fireEvent.click(screen.getAllByRole('button', { name: 'Go to Test Member' })[0]);

        expect(scrollIntoView).not.toHaveBeenCalled();
    });
});
