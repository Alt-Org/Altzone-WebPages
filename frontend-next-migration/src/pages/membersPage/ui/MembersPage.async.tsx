import dynamic from 'next/dynamic';

const MembersPageAsync = dynamic(() => import('./MembersPage'));


export default MembersPageAsync;
