import dynamic from 'next/dynamic';

const About = dynamic(() => import('./About'));

export default About;
