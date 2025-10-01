import dynamic from 'next/dynamic';

const HeroGroupNavMenuAsync = dynamic(() => import('./HeroGroupNavMenu'));

export default HeroGroupNavMenuAsync;
