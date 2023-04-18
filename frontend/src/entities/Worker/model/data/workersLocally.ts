import {GroupType, GroupWithWorkman, WorkerStatus} from "../types/types";

export const groupsWithWorkersLocally: GroupWithWorkman[] = [

    {
        group: GroupType.Management,
        workers : [
            {
                id: 1,
                name: 'Helena Pavloff-Pelkonen',
                role: 'johtava (luova) pelisuunnittelija + PRG pj',
                email: 'psykkis@hotmail.com / psykkishele@gmail.com',
                github: 'psykkis',
                workPeriod: 'alusta alkaen',
                status: WorkerStatus.voluntary
            },
            {
                id: 2,
                name: 'Sakari Lukkaroinen',
                role: 'tekninen pelisuunnittelija',
                email: 'sakari.lukkaroinen@gmail.com',
                workPeriod: 'alusta alkaen',
                status: WorkerStatus.voluntary
            },
        ]
    },

    //--------------------------------------------------------------------
    {
        group: GroupType.Art,
        workers: [
            {
                id: 3,
                name: 'Anastasiia (Nasti) Skobkina',
                role: 'grafiikka (pelihahmot)',
                workPeriod: '2022 alkuvuodesta alkaen',
                status: WorkerStatus.voluntary
            },

            {
                id: 4,
                name: 'Milja Sissonen',
                role: 'grafiikka (pelikentän tausta ja elementit)',
                github: 'Moryps',
                workPeriod: '24.10.2022 alkaen',
                status: WorkerStatus.voluntary
            },

            {
                id: 5,
                name: 'Milo Keronen',
                role: 'grafiikka',
                workPeriod: '1.11.-30.11.2022 & 1.12.-31.1.2023',
                status: WorkerStatus.worker
            },

            {
                id: 6,
                name: 'Emmi Pusa',
                role: 'grafiikka',
                workPeriod: '11.04.2023 alkaen',
                status: WorkerStatus.voluntary

            },

            {
                id: 7,
                name: 'Katri Tempakka',
                role: 'grafiikka',
                workPeriod: '16.12.2022 alkaen',
                status: WorkerStatus.voluntary
            },

            {
                id: 8,
                name: 'Joanna Lindström',
                role: 'grafiikka',
                workPeriod: '27.02.2023 alkaen',
                status: WorkerStatus.voluntary
            },

            {
                id: 9,
                name: 'Iida Välimäki',
                role: 'grafiikka',
                workPeriod: '04.02.2023 alkaen',
                status: WorkerStatus.voluntary
            },

            {
                id: 10,
                name: 'Rasmus Toikka',
                role: 'grafiikka',
                status: WorkerStatus.voluntary
            },

            {
                id : 11,
                name: 'Nova Kallio',
                role: 'grafiikka',
                workPeriod: '03.04.2023 alkaen',
                status: WorkerStatus.voluntary,
            },

            {
                id: 12,
                name: 'Valeria Velichko',
                role: 'grafiikka',
                workPeriod: '09.04.2023 alkaen',
                status: WorkerStatus.voluntary,
            },
        ]
    },

    //--------------------------------------------------------------------
    {
        group: GroupType.Code,
        workers: [
            {
                id: 13,
                name: 'Jari Petäys',
                role: 'koodi(mentori)',
                status: WorkerStatus.voluntary,
                github: 'jpetays',
                workPeriod: 'alusta asti',
            },

            {
                id: 14,
                name: 'Tomi Rämö',
                role: 'koodi',
                github: 'TomiRam',
                status: WorkerStatus.voluntary
            },

            {
                id: 15,
                name: 'Pasi Ylärinne',
                role: 'koodi',
                status: WorkerStatus.worker,
                github: 'Bashwyck',
                workPeriod: '29.8.-2.12.2022',
            },

            {
                id: 16,
                name: 'Elmeri Jatala',
                role: 'koodi (battle)',
                status: WorkerStatus.worker,
                github: 'Elmeri',
                workPeriod: '9.1. - 19.5.2023',
            },

            {
                id: 17,
                name: 'Otto Ikonen',
                role: 'koodi (Raid)',
                status: WorkerStatus.intern,
                github: 'OttoIkonen',
                workPeriod: '9.1. - 2.6.2023',
            },

            {
                id: 18,
                name: 'Lukas Järvelä',
                role: 'koodi (battle)',
                status: WorkerStatus.intern,
                github: 'ScrubMans',
                workPeriod: '9.1. - 19.5.2023',
            },

            {
                id: 19,
                name: 'Lassi Salo',
                role: 'koodi',
                status: WorkerStatus.voluntary,
            },

            {
                id: 20,
                name: 'Leo Hannolainen',
                github: 'leolab1337',
                role: 'koodi (Web pages)',
                status: WorkerStatus.voluntary,
                workPeriod: '20.02.2023 alkaen',
            },

            {
                id: 21,
                name: 'Mikhail Deriabin',
                github: 'MikhailDeriabin',
                role: 'koodi (API)',
                status: WorkerStatus.voluntary,
                workPeriod: '20.02.2023 alkaen',
            },
        ]
    },

    //--------------------------------------------------------------------

    {
        group: GroupType.Sound,
        workers: [
            {
                id: 22,
                name: 'Otso Puhakka',
                role: 'muusikko',
                status: WorkerStatus.voluntary,
                workPeriod: '2022 kesästä alkaen',
            },
        ]
    },



    //--------------------------------------------------------------------
    {
        group: GroupType.Prod,
        workers: [
            {
                id: 23,
                name: 'Tarja Porkka-Kontturi',
                role: 'tuottaja-konsultti',
                status: WorkerStatus.voluntary,
                workPeriod: '2022 kesästä alkaen',
            },
        ]
    },

    //--------------------------------------------------------------------

    {
        group: GroupType.Comics,
        workers: [
            {
                id: 24,
                name: 'Christian Lindholm',
                role: 'sarjakuvapiirtäjä',
                status: WorkerStatus.voluntary,
                workPeriod: '2022 kesästä alkaen',
            },
        ]
    },

    //--------------------------------------------------------------------
    {
        group: GroupType.OthersGame,
        workers: [
            {
                id: 25,
                name: 'Markku Pyrrö'
            },
            {
                id: 26,
                name: 'Esa Pavloff-Pelkonen'
            },
            {
                id: 27,
                name: 'Suvi Palviainen'
            },
            {
                id: 28,
                name: 'Mikko Härkönen'
            },
            {
                id: 29,
                name: 'Sampo Rajala'
            },
            {
                id: 30,
                name: 'Kristian Turkki'
            },
            {
                id: 31,
                name: 'Sakari Pohjola'
            },
            {
                id: 32,
                name: 'Ale Neppius'
            },
            {
                id: 33,
                name: 'Oona Suikkanen'
            },
            {
                id: 34,
                name: 'Stanislav Nefedov'
            },
            {
                id: 35,
                name: 'Saku Remahl'
            },
            {
                id: 36,
                name: 'Mikael Eskonen'
            },
            {
                id: 38,
                name: 'Aleksi Saarinen'
            },
            {
                id: 39,
                name: 'Jay Heikkilä'
            },
            {
                id: 40,
                name: 'Sami Sobori'
            },
            {
                id: 41,
                name: 'Alice Grönholm'
            },
            {
                id: 42,
                name: 'Taru Hämäläinen'
            },
            {
                id: 43,
                name: 'Joni Rokkanen'
            },
            {
                id: 44,
                name: 'Jesse'
            },
            {
                id: 45,
                name: 'Anna-Maija Hyttinen'
            },
            {
                id: 46,
                name: 'Tiia Söderlund'
            },
            {
                id: 47,
                name: 'Andreas Julkunen'
            },
            {
                id: 48,
                name: 'Jarno Vartiainen'
            },
            {
                id: 49,
                name: 'Janika Suhonen'
            },
            {
                id: 50,
                name: 'Krista Puusti'
            },
            {
                id: 51,
                name: 'Pauliina Holopainen'
            },
            {
                id: 52,
                name: 'Ronnie Isomäki'
            },
            {
                id: 152,
                name: 'Pyry Siikjärvi'
            },
            {
                id: 53,
                name: 'Joni Miettinen'
            },
            {
                id: 54,
                name: 'Samuel Lindström'
            },
            {
                id: 55,
                name: 'Lauri Salmi'
            },
            {
                id: 56,
                name: 'William Rueter'
            },
            {
                id: 57,
                name: 'Samuel Käyhkö'
            },
            {
                id: 58,
                name: 'Stella Crawford',
                role: 'grafiikka (logo, zone)'
            },
            {
                id: 59,
                name: 'Emilio Mäkipää / grafiikka (logo)',
                role: 'grafiikka (logo, zone)'
            },
            {
                id: 60,
                name: 'Sebastian Lindgren'
            },
            {
                id: 61,
                name: 'Luca Cannavo'
            },
            {
                id: 62,
                name: 'Rikhard Liikanen'
            },
            {
                id: 63,
                name: 'Nana Siikava'
            },
            {
                id: 64,
                name: 'Jupiter Pitkänen',
                role: 'grafiikka (alkukuvien lapset)'
            },
            {
                id: 65,
                name: 'Mille Rönkkö'
            },
            {
                id: 66,
                name: 'Anna-Maija Ratilainen'
            },
            {
                id: 67,
                name: 'Jere Koivisto'
            },

        ]
    },



    //--------------------------------------------------------------------


    {
        group: GroupType.OtherComics,
        workers: [
            {   id: 68,
                name: 'Suvi Palviainen'
            },
            {
                id: 69,
                name: 'Essi Tarvainen'
            },
            {
                id: 70,
                name: 'Milo Keronen'
            },
            {
                id: 71,
                name: 'Christian Lindholm'
            },
        ]
    },



    //--------------------------------------------------------------------


    {
        group: GroupType.Others,
        workers: [
            {
                id: 72,
                name: 'Anssi Ahola'
            },
            {
                id: 73,
                name: 'Olli Raudus'
            },
            {
                id: 74,
                name: 'Vesa Raudasoja'
            },
            {
                id: 75,
                name: 'Maria Kalliorinne'
            },
            {
                id: 76,
                name: 'Tuukka Lehkonen'
            },
            {
                id: 77,
                name: 'Susanna Viljanmaa'
            },
            {
                id: 78,
                name: 'Milsa Malin'
            },
            {
                id: 79,
                name: 'Milla Pennanen'
            },
            {
                id: 80,
                name: 'Henri Huttunen'
            },
            {
                id: 81,
                name: 'Maria Jauhiainen'
            },
            {
                id: 82,
                name: 'Tuuja Jänicke'
            },
            {
                id: 83,
                name: 'Jarno Paunonen'
            },
            {
                id: 84,
                name: 'Juko Leino'
            }
        ]
    },









]