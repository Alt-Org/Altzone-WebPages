import { useNavbarLinks } from '../hooks/useNavbarLinks';

export const useNavbarBuildBySize = (size: 'desktop' | 'mobile' | 'tablet') => {
    const links = useNavbarLinks();

    return {
        type: size === 'desktop' ? 'large' : 'small',
        links,
        menu: [], // Add a default menu property
        namedMenu: {}, // Add a default namedMenu property
    };
};
