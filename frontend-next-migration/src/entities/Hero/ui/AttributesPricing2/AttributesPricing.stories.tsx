import { Meta } from '@storybook/react';
import React from 'react';
import { HeroSlug } from '@/entities/Hero';
import { AttributesPricing } from './AttributesPricing';

const meta: Meta<typeof AttributesPricing> = {
    title: 'Entities/Hero/AttributesPricing2',
    component: AttributesPricing,
    tags: ['autodocs'],

    args: {
        initialHeroLevel: 1,
        heroSlug: HeroSlug.CONMAN
    },
};

export default meta;

export const Chart = (args: any) => <AttributesPricing {...args} />;
