import dynamic from 'next/dynamic';

const HeroDevelopmentPageAsync = dynamic(() => import('./HeroDevelopmentPage'));

export default HeroDevelopmentPageAsync;
