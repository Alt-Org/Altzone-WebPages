import dynamic from 'next/dynamic';

const HeroNavMenuAsync = dynamic(() => import('./HeroNavMenu'));

export default HeroNavMenuAsync;
