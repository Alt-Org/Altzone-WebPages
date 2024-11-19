import { Meta } from '@storybook/react';
import React from 'react';
import { HeroSlug } from '@/entities/Hero';
import { AttributesPricing } from './AttributesPricing';

const meta: Meta<typeof AttributesPricing> = {
    title: 'Entities/Hero/AttributesPricing',
    component: AttributesPricing,

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
                value: 1,
                rarityClass: 1,
                color: 'rgb(153,0,255)',
            },
            { name: 'hp', value: 2, rarityClass: 3, color: 'rgb(0,255,0)' },
            { name: 'size', value: 3, rarityClass: 7, color: 'rgb(224,102,102)' },
            { name: 'impactForce', value: 4, rarityClass: 10, color: 'rgb(255,153,0)' },
            { name: 'speed', value: 5, rarityClass: 5, color: 'rgb(0,255,255)' },
        ],
    },
};

export default meta;

export const Chart = (args: any) => <AttributesPricing {...args} />;
