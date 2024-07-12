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
<<<<<<< HEAD
    case 'Privacy':
      return 'privacy';
=======
>>>>>>> e87127dbb1045e9d3e6cc55c2ac238fdeecbdd6a
    default:
      return 'navbar';
  }
};
