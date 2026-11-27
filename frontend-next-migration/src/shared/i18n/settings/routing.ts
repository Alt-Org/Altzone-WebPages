import { languages } from './settings';

export const getPathLanguage = (pathname: string) =>
    languages.find((language) => pathname.split('/')[1] === language);
