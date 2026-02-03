import dynamic from 'next/dynamic';

const AdminNewsElementPageAsync = dynamic(() => import('./AdminNewsElementPage'));

export default AdminNewsElementPageAsync;
