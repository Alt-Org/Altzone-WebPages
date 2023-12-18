export enum GroupType {
    GameDesign = 'GameDesign',
    Graphic = "Graphic",
    LogoGraphic = 'LogoGraphic',
    GameGraphic = 'GameGraphic',
    GameAnimation= 'GameAnimation',
    GameCode = 'GameCode',
    APICode = 'APICode',
    WebPagesCode = 'WebPagesCode',
    Sound = 'Sound',
    Comics = 'Comics',
    Prod = 'Prod',
    OthersGame = 'OthersGame',
    OthersComics = 'OthersComics',
    Others = 'Others',
}

export enum MemberStatus{
    voluntary = 'vapaaehtoinen',
    worker = 'työntekijä',
    intern = 'työharjoittelija'
}

export interface GroupWithMember {
    group: GroupType,
    workers: Member[]
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
    linkedin?: string
}
