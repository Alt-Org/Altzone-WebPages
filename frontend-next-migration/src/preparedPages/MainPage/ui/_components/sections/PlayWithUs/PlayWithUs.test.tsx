import { render, screen } from '@testing-library/react';
import PlayWithUs, { Props } from './PlayWithUs';

const mockProps: Props = {
    title: 'Join the Game',
    webGl: {
        title: 'Play Online',
        link: 'https://example.com/webgl',
        titleDownload: 'Download Android',
        text: 'Play directly in browser.',
        downloadText: 'Get the app from Google Play',
    },
    googlePLayLink: 'https://play.google.com/store/apps/details?id=com.example.app',
    belowNavs: [],
    webGlNotice: 'Note: WebGL performance may vary.',
};

describe('PlayWithUs', () => {
    it('renders the title and buttons correctly', () => {
        render(<PlayWithUs {...mockProps} />);

        expect(screen.getByText(mockProps.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.webGl.title)).toBeInTheDocument();
        expect(screen.getByText(mockProps.webGl.text)).toBeInTheDocument();
        expect(screen.getByText(mockProps.webGl.titleDownload)).toBeInTheDocument();
        expect(screen.getByText(mockProps.webGl.downloadText)).toBeInTheDocument();
    });
});
