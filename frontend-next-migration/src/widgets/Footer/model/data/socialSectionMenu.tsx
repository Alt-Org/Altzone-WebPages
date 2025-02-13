import Discord from '@/shared/assets/images/Discord2.svg';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import Instagram from '@/shared/assets/images/Insta2.svg';
import Facebook from '@/shared/assets/images/Facebook2.svg';
import Youtube from '@/shared/assets/images/Youtube2.svg';
import { SocialIconLink } from '../types/types';

export const socialIconLinks: SocialIconLink[] = [
    {
        name: 'Discord',
        icon: Discord,
        link: AppExternalLinks.discord,
    },
    {
        name: 'Instagram',
        icon: Instagram,
        link: AppExternalLinks.instagram,
    },
    {
        name: 'Facebook',
        icon: Facebook,
        link: AppExternalLinks.facebook,
    },
    {
        name: 'Youtube',
        icon: Youtube,
        link: AppExternalLinks.youtube,
    },
];
