import { Meta } from '@storybook/react';
import React from 'react';
import { HeroSlug } from '../../types/hero';
import { AttributesPricingTable } from './AttributesPricingTable';

// import { AttributesPricing,
//     // AttributesPricingProps
// } from "./AttributesPricing";
const meta: Meta<typeof AttributesPricingTable> = {
    title: 'Entities/Hero/AttributesPricingTable',
    component: AttributesPricingTable,
    tags: ['autodocs'],

    args: {

        // heroLevel: 1,
        initialHeroSlug: HeroSlug.CONMAN,
        initialLevel: 1
    },
};

export default meta;

export const Chart = (args: any) => <AttributesPricingTable {...args} />;
