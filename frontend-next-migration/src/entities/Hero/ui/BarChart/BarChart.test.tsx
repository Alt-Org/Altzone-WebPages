import { render, screen } from '@testing-library/react';
import { useClientTranslation } from '@/shared/i18n';
import { BarChart } from './BarChart';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));
const props = {
    stats: [
        { name: 'resistance', defaultLevel: 1, color: 'rgb(153,0,255)' },
        { name: 'hp', defaultLevel: 2, color: 'rgb(0,255,0)' },
        { name: 'size', defaultLevel: 5, color: 'rgb(224,102,102)' },
        { name: 'impactForce', defaultLevel: 3, color: 'rgb(255,153,0)' },
        { name: 'speed', defaultLevel: 2, color: 'rgb(0,255,255)' },
    ],
};
describe('BarChart', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
    });

    test('render components', () => {
        render(<BarChart {...props} />);

        expect(screen.getByTestId('resistance')).toBeInTheDocument();
        expect(screen.getByTestId('hp')).toBeInTheDocument();
        expect(screen.getByTestId('size')).toBeInTheDocument();
        expect(screen.getByTestId('impactForce')).toBeInTheDocument();
        expect(screen.getByTestId('speed')).toBeInTheDocument();
    });
});
