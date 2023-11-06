import dynamic from 'next/dynamic';

// const MembersPageAsync = dynamic(() => import('./MembersPage'));
const MembersPage = dynamic(() => import('./MembersPage'));

export async function getStaticProps() {
    return {
        props: {},
    };
}

// export default MembersPageAsync;
export default MembersPage;
