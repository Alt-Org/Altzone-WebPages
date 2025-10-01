import dynamic from 'next/dynamic';

const TeachersPageAsync = dynamic(() => import('./TeachersPage'));

export default TeachersPageAsync;
