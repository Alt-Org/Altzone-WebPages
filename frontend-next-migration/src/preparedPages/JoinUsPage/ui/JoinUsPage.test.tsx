import { render, screen } from '@testing-library/react';
import cls from './SectionJoinUs.module.scss';
import { JoinUsPage } from './JoinUsPage';
import { BlockSection } from '../types';

const discordBlock: BlockSection = {
    label: 'Discord',
    description: 'Discord description',
    link: 'https://example.com',
    linkText: 'Discord link',
    img: '',
};
const redditBlock: BlockSection = {
    label: 'Reddit',
    description: 'Reddit description',
    link: 'https://example.com',
    linkText: 'Reddit link',
    img: '',
};
const teachersBlock: BlockSection = {
    label: 'Teachers!',
    description: 'Teachers description',
    link: 'https://example.com',
    linkText: 'Teachers link',
    img: '',
};
const feedbackBlock: BlockSection = {
    label: 'Feedback',
    description: 'Feedback description',
    link: 'https://example.com',
    linkText: 'Feedback link',
    img: '',
};
const duunitoriBlock: BlockSection = {
    label: 'Duunitori',
    description: 'Duunitori description',
    link: 'https://example.com',
    linkText: 'Duunitori link',
    img: '',
};
const instagramBlock: BlockSection = {
    label: 'Instagram',
    description: 'Instagram description',
    link: 'https://example.com',
    linkText: 'Instagram link',
    img: '',
};

describe('SectionJoinUs', () => {
    it('renders the page title correctly', () => {
        render(
            <JoinUsPage
                title={'Join us!'}
                discordBlock={discordBlock}
                connectionBlock={redditBlock}
                instagramBlock={instagramBlock}
                teachersBlock={teachersBlock}
                feedbackBlock={feedbackBlock}
                duunitoriBlock={duunitoriBlock}
            />,
        );

        expect(screen.getByText('Join us!')).toBeInTheDocument();
    });

    it('renders all the block labels, descriptions and links correctly', () => {
        render(
            <JoinUsPage
                title={'Join us!'}
                discordBlock={discordBlock}
                connectionBlock={redditBlock}
                instagramBlock={instagramBlock}
                teachersBlock={teachersBlock}
                feedbackBlock={feedbackBlock}
                duunitoriBlock={duunitoriBlock}
            />,
        );

        expect(screen.getByText('Discord')).toBeInTheDocument();
        expect(screen.getByText('Reddit')).toBeInTheDocument();
        expect(screen.getByText('Instagram')).toBeInTheDocument();
        expect(screen.getByText('Teachers!')).toBeInTheDocument();
        expect(screen.getByText('Feedback')).toBeInTheDocument();
        expect(screen.getByText('Duunitori')).toBeInTheDocument();

        expect(screen.getByText('Discord description')).toBeInTheDocument();
        expect(screen.getByText('Reddit description')).toBeInTheDocument();
        expect(screen.getByText('Instagram description')).toBeInTheDocument();
        expect(screen.getByText('Teachers description')).toBeInTheDocument();
        expect(screen.getByText('Feedback description')).toBeInTheDocument();
        expect(screen.getByText('Duunitori description')).toBeInTheDocument();

        expect(screen.getByText('Discord link')).toBeInTheDocument();
        expect(screen.getByText('Reddit link')).toBeInTheDocument();
        expect(screen.getByText('Teachers link')).toBeInTheDocument();
        expect(screen.getByText('Feedback link')).toBeInTheDocument();
        expect(screen.getByText('Instagram link')).toBeInTheDocument();
        expect(screen.getByText('Duunitori link')).toBeInTheDocument();
    });

    it('applies the correct class', () => {
        const { container } = render(
            <JoinUsPage
                title={'Join us!'}
                discordBlock={discordBlock}
                connectionBlock={redditBlock}
                instagramBlock={instagramBlock}
                teachersBlock={teachersBlock}
                feedbackBlock={feedbackBlock}
                duunitoriBlock={duunitoriBlock}
            />,
        );

        expect(container.firstChild).toHaveClass(cls.Wrapper);
    });
});
