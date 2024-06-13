import dynamic from 'next/dynamic';

// const MembersPageAsync = dynamic(() => import('./MembersPage'));
const MembersPage = dynamic(() => import('./MembersPage'));

// export default MembersPageAsync;
export default MembersPage;
