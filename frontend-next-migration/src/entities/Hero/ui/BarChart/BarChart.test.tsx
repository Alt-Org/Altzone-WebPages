import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import { BarChart } from './BarChart';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));
const props = {
    width: 300,
    height: 150,
    stats: {
        resistance: 5,
        hp: 2,
        size: 3,
        impactForce: 4,
        speed: 3,
    },
};
describe('BarChart', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
    });

    test('render components', () => {
        render(<BarChart {...props} />);

        const yMaxValue = screen.getByTestId('yMaxValue');
        expect(yMaxValue.textContent).toContain('5');
        expect(screen.getByTestId('resistance')).toBeInTheDocument();
        expect(screen.getByTestId('hp')).toBeInTheDocument();
        expect(screen.getByTestId('size')).toBeInTheDocument();
        expect(screen.getByTestId('impactForce')).toBeInTheDocument();
        expect(screen.getByTestId('speed')).toBeInTheDocument();
    });
});
