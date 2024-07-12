import { NavBarType } from './types';

export const defineNs = (navBarType: NavBarType) => {
  switch (navBarType) {
    case 'GameArt':
      return 'artGame';
    case 'TeachingPackage':
      return 'teachingPackage';
    case 'Clan':
      return 'clan';
    case 'Cookies':
      return 'cookies';
    default:
      return 'navbar';
  }
};
