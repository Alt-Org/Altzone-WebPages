import dynamic from 'next/dynamic';

const SingleHeroNavMenuAsDropdownAsync = dynamic(() => import('./SingleHeroNavMenuAsDropdown'));

export default SingleHeroNavMenuAsDropdownAsync;
