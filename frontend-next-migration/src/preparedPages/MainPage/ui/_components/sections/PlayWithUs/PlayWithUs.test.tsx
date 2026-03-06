import { render, screen } from '@testing-library/react';
import PlayWithUs, { Props } from './PlayWithUs';

const mockProps: Props = {
    title: 'Join the Game',
    webGl: {
        title: 'Play Online',
        link: 'https://example.com/webgl',
    },
    googlePLayLink: 'https://play.google.com/store/apps/details?id=com.example.app',
    belowNavs: [],
    webGlNotice: 'Note: WebGL performance may vary.',
};

describe('PlayWithUs', () => {
    it('renders the component with required props', () => {
        render(<PlayWithUs {...mockProps} />);

        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.webGl.title)).toBeInTheDocument();
    });
});
