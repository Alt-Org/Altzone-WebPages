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

const members: Member[] = [{ id: 1, name: 'Test Member' }];

describe('MosaicGrid', () => {
    beforeEach(() => {
        (useSizes as jest.Mock).mockReturnValue({ isMobileSize: false });
        (useClientTranslation as jest.Mock).mockReturnValue({
            t: (key: string, options?: { name?: string }) =>
                key === 'go-to-member' ? `Go to ${options?.name}` : key,
        });
    });

    it('renders a clickable portrait button with an accessible aria-label', () => {
        render(<MosaicGrid members={members} />);

        expect(screen.getAllByRole('button', { name: 'Go to Test Member' }).length).toBeGreaterThan(
            0,
        );
    });

    it('scrolls to the member row smoothly when the portrait is clicked', () => {
        const scrollIntoView = jest.fn();
        Object.defineProperty(Element.prototype, 'scrollIntoView', {
            configurable: true,
            value: scrollIntoView,
        });
        document.body.innerHTML = '<div id="member-1"></div>';

        render(<MosaicGrid members={members} />);
        fireEvent.click(screen.getAllByRole('button', { name: 'Go to Test Member' })[0]);

        expect(scrollIntoView).toHaveBeenCalledTimes(1);
        expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
});
