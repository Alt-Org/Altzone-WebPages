import dynamic from 'next/dynamic';

const MembersPage = dynamic(() => import('./MembersPage'));

// export default MembersPageAsync;
export default MembersPage;
