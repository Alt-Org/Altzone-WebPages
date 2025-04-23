import { useNavbarLinks } from './useNavbarLinks';

export const useNavbarBuildBySize = (size: string) => {
    const links = useNavbarLinks();

    return {
        type: size === 'desktop' ? 'large' : 'small',
        links,
        menu: [], // Add a default menu property
        namedMenu: {}, // Add a default namedMenu property
    };
};
