export enum GroupType {
    GameDesign = 'Pelisuunnittelu',
    LogoGraphic = 'Grafiikka, logo',
    GameGraphic = 'Grafiikka, peli',
    GameAnimation= 'Grafiikka, animaatio',
    GameCode = 'Koodi, peli',
    APICode = 'Koodi, API',
    WebPagesCode = 'Koodi, nettisivut',
    Sound = 'Äänisuunnittelu, sävellys',
    Comics = 'Sarjakuva',
    Prod = 'Tuotanto',
    OthersGame = 'Pelinkehityksessä mukana',
    Others = 'Erityiskiitokset',
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
    imgSrc?: string;
    role?: string;
    email?: string;
    phone?: string;
    github?: string;
    discord?: string;
    trello?: string;
    status?: WorkerStatus;
    workPeriod?: string;
}
