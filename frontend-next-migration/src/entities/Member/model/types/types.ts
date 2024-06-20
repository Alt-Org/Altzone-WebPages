export enum GroupType {
  GameDesign = 'GameDesign',
  Graphic = 'Graphics',
  LogoGraphic = 'LogoGraphic',
  GameGraphic = 'GameGraphic',
  GameAnimation = 'GameAnimation',
  GameCode = 'GameCode',
  APICode = 'APICode',
  WebPagesCode = 'WebPagesCode',
  Sound = 'Sounds',
  Comics = 'Comics',
  OthersGame = 'OthersGame',
  OthersComics = 'OthersComics',
  Others = 'Others',
  UserInterface = 'User Interface',
  EducationalDesigner = 'Educational Designer',
  Concept = 'Original game concept',
  Production = 'Production',
  ProductionConsultant = 'Production consultant',
  SocialMedia = 'Social media',
  TechnicalConsultant = 'Technical consultant',
  ArtisticDirector = 'Artistic director',
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
