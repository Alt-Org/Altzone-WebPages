import dynamic from 'next/dynamic';
import { Props } from './About';

const About = dynamic<Props>(() => import('./About'));

export default About;
