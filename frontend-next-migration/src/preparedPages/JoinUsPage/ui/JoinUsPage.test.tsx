import { render, screen } from '@testing-library/react';
import cls from './SectionJoinUs.module.scss';
import { JoinUsPage } from './JoinUsPage';
import { BlockSection } from '../types';

/**
 * Mock data for the different BlockSections used on the JoinUsPage.
 */
const discordBlock: BlockSection = {
    label: 'Discord',
    description: 'Join our Discord server to connect!',
    links: [{ text: 'Discord link', url: 'https://example.com', isExternal: true }],
    img: '',
};

const redditBlock: BlockSection = {
    label: 'Reddit',
    description: 'Reddit community page.',
    links: [{ text: 'Reddit link', url: 'https://example.com', isExternal: true }],
    img: '',
};

const teachersBlock: BlockSection = {
    label: 'Teachers!',
    description: 'Information for teachers.',
    links: [{ text: 'Teachers link', url: 'https://example.com', isExternal: true }],
    img: '',
};

const feedbackBlock: BlockSection = {
    label: 'Feedback',
    description: 'Send us your feedback.',
    links: [{ text: 'Feedback link', url: 'https://example.com', isExternal: true }],
    img: '',
};

const duunitoriBlock: BlockSection = {
    label: 'Duunitori',
    description: 'Open positions at Duunitori.',
    links: [{ text: 'Duunitori link', url: 'https://example.com', isExternal: true }],
    img: '',
};

const instagramBlock: BlockSection = {
    label: 'Instagram',
    description: 'Follow us on Instagram!',
    links: [{ text: 'Instagram link', url: 'https://example.com', isExternal: true }],
    img: '',
};

describe('JoinUsPage', () => {
    const setup = () =>
        render(
            <JoinUsPage
                title="Join us!"
                discordBlock={discordBlock}
                connectionBlock={redditBlock}
                instagramBlock={instagramBlock}
                teachersBlock={teachersBlock}
                feedbackBlock={feedbackBlock}
                duunitoriBlock={duunitoriBlock}
            />,
        );

    it('renders the page title correctly', () => {
        setup();
        expect(screen.getByText('Join us!')).toBeInTheDocument();
    });

    it('renders all block labels, descriptions, and links correctly', () => {
        setup();

        // Labels
        expect(screen.getByText('Discord')).toBeInTheDocument();
        expect(screen.getByText('Reddit')).toBeInTheDocument();
        expect(screen.getByText('Instagram')).toBeInTheDocument();
        expect(screen.getByText('Teachers!')).toBeInTheDocument();
        expect(screen.getByText('Feedback')).toBeInTheDocument();
        expect(screen.getByText('Duunitori')).toBeInTheDocument();

        // Descriptions
        expect(screen.getByText('Join our Discord server to connect!')).toBeInTheDocument();
        expect(screen.getByText('Reddit community page.')).toBeInTheDocument();
        expect(screen.getByText('Follow us on Instagram!')).toBeInTheDocument();
        expect(screen.getByText('Information for teachers.')).toBeInTheDocument();
        expect(screen.getByText('Send us your feedback.')).toBeInTheDocument();
        expect(screen.getByText('Open positions at Duunitori.')).toBeInTheDocument();

        // Link texts
        expect(screen.getByText('Discord link')).toBeInTheDocument();
        expect(screen.getByText('Reddit link')).toBeInTheDocument();
        expect(screen.getByText('Instagram link')).toBeInTheDocument();
        expect(screen.getByText('Teachers link')).toBeInTheDocument();
        expect(screen.getByText('Feedback link')).toBeInTheDocument();
        expect(screen.getByText('Duunitori link')).toBeInTheDocument();

        // imgs
        expect(screen.queryByAltText('Discord Icon')).not.toBeInTheDocument();
        expect(screen.queryByAltText('Reddit Icon')).not.toBeInTheDocument();
        expect(screen.queryByAltText('Instagram Icon')).not.toBeInTheDocument();
        expect(screen.queryByAltText('Teachers Icon')).not.toBeInTheDocument();
        expect(screen.queryByAltText('Feedback Icon')).not.toBeInTheDocument();
    });

    it('applies the correct wrapper class', () => {
        const { container } = setup();
        expect(container.firstChild).toHaveClass(cls.Wrapper);
    });
});
