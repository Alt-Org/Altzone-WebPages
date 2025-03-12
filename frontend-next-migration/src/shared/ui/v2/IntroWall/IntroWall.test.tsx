import IntroWall from './IntroWall';
import { render, screen } from '@testing-library/react';

describe('WallIntroanimation', () => {
    it('renders wall correctly', () => {
        render(<IntroWall />);
        const wall = screen.getAllByTestId('TestWall').at(0);
        expect(wall).toBeInTheDocument();
    });

    it('renders tiles correctly', () => {
        render(<IntroWall />);
        const tile = screen.getAllByAltText('tile').at(0);
        const anotherTile = screen.getAllByAltText('tile').at(10);
        expect(tile).toBeInTheDocument();
        expect(anotherTile).toBeInTheDocument();
    });
});
