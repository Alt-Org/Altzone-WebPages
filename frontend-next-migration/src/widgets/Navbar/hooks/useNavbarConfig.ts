import { useNavbarLinks } from './useNavbarLinks';

export const useNavbarBuildBySize = (size: string) => {
    const links = useNavbarLinks();

    return {
        type: size === 'desktop' ? 'large' : 'small',
        links,
    };
};
