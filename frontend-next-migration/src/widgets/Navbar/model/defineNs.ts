import { NavBarType } from './types';

export const defineNs = (navBarType: NavBarType) => {
  switch (navBarType) {
    case 'GameArt':
      return 'artGame';
    case 'Cookies':
      return 'cookies';
    case 'Privacy':
      return 'privacy';
    default:
      return 'navbar';
  }
};

