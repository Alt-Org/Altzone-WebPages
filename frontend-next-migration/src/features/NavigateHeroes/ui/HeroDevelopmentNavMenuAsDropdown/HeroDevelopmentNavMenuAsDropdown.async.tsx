import dynamic from 'next/dynamic';

const HeroDevelopmentNavMenuAsDropdownAsync = dynamic(
    () => import('./HeroDevelopmentNavMenuAsDropdown'),
);

export default HeroDevelopmentNavMenuAsDropdownAsync;
