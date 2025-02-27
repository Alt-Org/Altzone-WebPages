import { render, screen } from '@testing-library/react';
import WallIntroAnimation from './WallIntroAnimation';

describe('WallIntroanimation', () => {
    it('renders walls correctly', () => {
        render(
            <WallIntroAnimation>
                <div>
                    <h1>Test</h1>
                </div>
            </WallIntroAnimation>,
        );
        const wall = screen.getAllByTestId('testWall').at(0);
        expect(wall).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <WallIntroAnimation>
                <div>
                    <h1>Test</h1>
                </div>
            </WallIntroAnimation>,
        );
        const wall = screen.getByText('Test');
        expect(wall).toBeInTheDocument();
    });
});
