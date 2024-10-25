import { Meta, StoryObj } from '@storybook/react';
import CustomCarousel from './CustomCarousel';
import './CustomCarousel.scss';

const meta: Meta<typeof CustomCarousel> = {
    title: 'shared/ui/CustomCarousel',
    component: CustomCarousel,
    argTypes: {
        settings: {
            control: 'object',
            description: 'Configuration settings for the carousel behavior.',
            defaultValue: {
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplaySpeed: 10000,
                responsive: [
                    { breakpoint: 1300, settings: { slidesToShow: 2 } },
                    { breakpoint: 800, settings: { slidesToShow: 1 } },
                    { breakpoint: 480, settings: { slidesToShow: 1 } },
                ],
            },
        },
        children: {
            control: 'text',
            description: 'Elements to be displayed in the carousel as slides.',
            defaultValue: 'Sample Slide Content',
        },
        className: {
            control: 'text',
            description: 'CSS class names for custom styling on the carousel wrapper.',
            defaultValue: '',
        },
    },
    args: {
        settings: {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplaySpeed: 10000,
        },
        children: [
            <div key={1}>Slide 1</div>,
            <div key={2}>Slide 2</div>,
            <div key={3}>Slide 3</div>,
        ],
        className: '',
    },
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component:
                    'The `CustomCarousel` component renders a customizable slider/carousel with options for autoplay, speed, and responsive breakpoints.',
            },
        },
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

// Default story using the default settings and sample slides
export const Default: Story = {};

// A story demonstrating autoplay functionality
export const Autoplay: Story = {
    args: {
        settings: {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
        },
        children: [
            <div key={1}>Autoplay Slide 1</div>,
            <div key={2}>Autoplay Slide 2</div>,
            <div key={3}>Autoplay Slide 3</div>,
        ],
    },
};
