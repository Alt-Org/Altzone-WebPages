export enum GroupType {
    Management = 'Management',
    Art = 'Art',
    Code = 'Code',
    Sound = 'Sound',
    Prod = 'Prod',
    Comics = 'Comics',
    OthersGame = 'OthersGame',
    OtherComics = 'OtherComics',
    Others = 'Others',
}

export enum WorkerStatus{
    voluntary = 'vapaaehtoinen',
    worker = 'työntekijä',
    intern = 'työharjoittelija'
}

export interface GroupWithWorkman {
    group: GroupType,
    workers: Workman[]
}

export interface Workman {
    id: number;
    name: string;
    role?: string;
    email?: string;
    phone?: string;
    github?: string;
    discord?: string;
    trello?: string;
    status?: WorkerStatus;
    workPeriod?: string;
}
