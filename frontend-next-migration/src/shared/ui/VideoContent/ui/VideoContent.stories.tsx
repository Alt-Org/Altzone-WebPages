import { Meta, StoryObj } from '@storybook/react';
import VideoContentYoutube from './VideoContentYoutube';

const meta = {
    title: 'shared/ui/VideoContentYoutube',
    component: VideoContentYoutube,
    argTypes: {
        src: {
            control: 'text',
            description: 'The YouTube video URL to load.',
            defaultValue: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        params: {
            control: 'object',
            description:
                'Parameters for video content, including title, className, autoPlay, and thumbnailQuality.',
            defaultValue: {
                title: 'Sample Video',
                className: 'my-video-content',
                autoPlay: false,
                thumbnailQuality: 'maxres',
            },
        },
    },
    args: {
        src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        params: {
            title: 'Sample Video',
            className: 'my-video-content',
            autoPlay: false,
            thumbnailQuality: 'maxres',
        },
    },
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The `VideoContentYoutube` component is a React component that displays a YouTube video based on the provided URL. It accepts various parameters to customize the video playback experience, such as title, class name, autoplay option, and thumbnail quality. This component is designed to be reusable and easily integrated into different parts of your application.',
            },
        },
    },
} satisfies Meta<typeof VideoContentYoutube>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
    args: {
        src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        params: {
            title: 'My Favorite Video',
            className: 'custom-video-class',
            autoPlay: true,
            thumbnailQuality: 'hq',
        },
    },
};
