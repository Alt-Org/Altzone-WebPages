export enum GroupType {
  APICode = 'APICode',
  ArtisticDirector = 'ArtisticDirector',
  Comics = 'Comics',
  Concept = 'Concept',
  EducationalDesigner = 'EducationalDesigner',
  GameAnimation = 'GameAnimation',
  GameCode = 'GameCode',
  GameDesign = 'GameDesign',
  GameGraphic = 'GameGraphic',
  Graphic = 'Graphic',
  LogoGraphic = 'LogoGraphic',
  Others = 'Others',
  OthersComics = 'OthersComics',
  OthersGame = 'OthersGame',
  Production = 'Production',
  ProductionConsultant = 'ProductionConsultant',
  SocialMedia = 'SocialMedia',
  Sound = 'Sound',
  TechnicalConsultant = 'TechnicalConsultant',
  UserInterface = 'UserInterface',
  WebPagesCode = 'WebPagesCode',
}

export enum MemberStatus {
  voluntary = 'vapaaehtoinen',
  worker = 'työntekijä',
  intern = 'työharjoittelija',
}

export interface GroupWithMember {
  group: GroupType;
  workers: Member[];
}

export interface Member {
  id: number;
  name: string;
  imgSrc?: string;
  role?: string;
  email?: string;
  phone?: string;
  github?: string;
  discord?: string;
  trello?: string;
  status?: MemberStatus;
  workPeriod?: string;
  site?: string;
  linkedin?: string;
}
