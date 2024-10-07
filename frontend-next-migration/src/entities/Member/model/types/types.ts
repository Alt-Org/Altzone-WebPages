// export enum GroupType {
//   APICode = 'APICode',
//   ArtisticDirector = 'ArtisticDirector',
//   Comics = 'Comics',
//   Concept = 'Concept',
//   EducationalDesigner = 'EducationalDesigner',
//   GameAnimation = 'GameAnimation',
//   GameCode = 'GameCode',
//   GameDesign = 'GameDesign',
//   GameGraphic = 'GameGraphic',
//   Graphic = 'Graphic',
//   LogoGraphic = 'LogoGraphic',
//   Others = 'Others',
//   OthersComics = 'OthersComics',
//   OthersGame = 'OthersGame',
//   Production = 'Production',
//   ProductionConsultant = 'ProductionConsultant',
//   SocialMedia = 'SocialMedia',
//   Sound = 'Sound',
//   TechnicalConsultant = 'TechnicalConsultant',
//   UserInterface = 'UserInterface',
//   WebPagesCode = 'WebPagesCode',
// }

// export enum MemberStatus {
//   voluntary = 'vapaaehtoinen',
//   worker = 'työntekijä',
//   intern = 'työharjoittelija',
// }

// export interface GroupWithMember {
//   group: GroupType;
//   workers: Member[];
// }

// export interface Member {
//   id: number;
//   name: string;
//   imgSrc?: string;
//   role?: string;
//   email?: string;
//   phone?: string;
//   github?: string;
//   discord?: string;
//   trello?: string;
//   status?: MemberStatus;
//   workPeriod?: string;
//   site?: string;
//   linkedin?: string;
// }

// types.ts

/**
 * This file contains TypeScript interfaces that represent the structure of various entities
 * used throughout the application, such as Member, Department, Team, and Logo.
 */

export interface Logo {
  data: {
    attributes: {
      url: string;
    };
  } | null;
}

export interface Member {
  id: number;
  name: string;
  task?: string;
  email?: string;
  logo?: string | null;
  website?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export interface Department {
  id: number;
  name: string;
  members: Member[];
}

export interface Team {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  members: Member[];
  departments: Department[];
}
