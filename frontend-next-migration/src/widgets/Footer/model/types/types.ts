import React from 'react';

export interface SocialIconLink {
    name: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | string;
    link: string;
}

export interface Texts {
    cookies: string;
    privacy: string;
    consent: string;
    companyName: string;
    currentYear: number;
}
