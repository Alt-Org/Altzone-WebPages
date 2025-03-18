import { render, screen } from '@testing-library/react';
import WallIntroAnimation from './WallIntroAnimation';

describe('WallIntroanimation', () => {
    it('renders walls correctly', () => {
        render(<WallIntroAnimation />);
        const wall = screen.getAllByTestId('TestWall').at(0);
        expect(wall).toBeInTheDocument();
    });
});
