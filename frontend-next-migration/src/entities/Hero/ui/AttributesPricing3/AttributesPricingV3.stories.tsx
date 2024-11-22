import { Meta } from '@storybook/react';
import React from 'react';
import { HeroSlug } from '@/entities/Hero';
import { AttributesPricing3 } from './AttributesPricingV3';

const meta: Meta<typeof AttributesPricing3> = {
    title: 'Entities/Hero/AttributesPricingV3',
    component: AttributesPricing3,

    // argTypes: {
    //     stats: {
    //         description: 'contains name, value, rarity class and color information',
    //     },
    // },
    tags: ['autodocs'],

    args: {
        // heroLevel: 1,
        // initialHeroLevel: 1,
        // heroSlug: HeroSlug.CONMAN

        stats: [
            {
                name: 'resistance',
                defaultLevel: 1,
                developmentLevel: 0,
                rarityClass: 1,
                color: 'rgb(153,0,255)',
            },
            {
                name: 'hp',
                defaultLevel: 2,
                developmentLevel: 0,
                rarityClass: 3,
                color: 'rgb(0,255,0)',
            },
            {
                name: 'size',
                defaultLevel: 3,
                developmentLevel: 0,
                rarityClass: 7,
                color: 'rgb(224,102,102)',
            },
            {
                name: 'impactForce',
                defaultLevel: 4,
                developmentLevel: 0,
                rarityClass: 10,
                color: 'rgb(255,153,0)',
            },
            {
                name: 'speed',
                defaultLevel: 5,
                developmentLevel: 0,
                rarityClass: 5,
                color: 'rgb(0,255,255)',
            },
        ],
    },
};

export default meta;

export const Chart = (args: any) => <AttributesPricing3 {...args} />;
