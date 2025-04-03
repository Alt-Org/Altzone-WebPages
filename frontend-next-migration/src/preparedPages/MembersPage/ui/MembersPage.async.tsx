import dynamic from 'next/dynamic';
import { Props } from './MembersPage';

const MembersPage = dynamic<Props>(() => import('./MembersPage'));

// export default MembersPageAsync;
export default MembersPage;
