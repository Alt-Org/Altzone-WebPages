import React from 'react';
import MyIcon from '@/shared/assets/images/facebook.svg';
import SampleImage from '@/shared/assets/images/introBackground-transformed2.png';
import Image from 'next/image';
import { Footer } from '@/widgets/Footer';

export const TestImages = (): JSX.Element => (
    <div>
        <h2>SVG Example:</h2>
        <MyIcon
            width={50}
            height={50}
        />

        <h2>Image Example:</h2>
        <Image
            src={SampleImage}
            alt="Sample"
            width={100}
            height={100}
        />
        <h2>Footer With SVG icons</h2>
        <Footer />
    </div>
);
export default TestImages;
