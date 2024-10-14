// import { GroupType, GroupWithMember } from '../types/types';
// export const groupsWithMembersLocally: GroupWithMember[] = [
//   {
//     group: GroupType.Concept,
//     workers: [
//       {
//         id: 1,
//         name: 'Aapo Laurila',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------

//   {
//     group: GroupType.ArtisticDirector,
//     workers: [
//       {
//         id: 2,
//         name: 'Helena Pavloff-Pelkonen',
//         github: 'psykkis',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------
//   {
//     group: GroupType.EducationalDesigner,
//     workers: [
//       {
//         id: 1002200,
//         name: 'Esa Pavloff-Pelkonen',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------
//   {
//     group: GroupType.Production,
//     workers: [
//       {
//         id: 1002097098,
//         name: 'Eeva Pirttiaho',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------
//   {
//     group: GroupType.ProductionConsultant,
//     workers: [
//       {
//         id: 11324234,
//         name: 'Tarja Porkka-Kontturi',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------
//   {
//     group: GroupType.TechnicalConsultant,
//     workers: [
//       {
//         id: 1132344,
//         name: 'Sakari Lukkaroinen',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------

//   {
//     group: GroupType.Graphic,
//     workers: [
//       {
//         id: 4,
//         name: 'Emilio Mäkipää',
//       },
//       {
//         id: 44444,
//         name: 'Milo Keronen',
//         site: 'https://mxmilo.wixsite.com/hiisikoloart',
//         // imgSrc: keronen
//       },
//       {
//         id: 5,
//         name: 'Milja Sissonen',
//         // imgSrc: imgStub
//       },
//       {
//         id: 6,
//         name: 'Emmi Pusa',
//         // imgSrc: pusa
//       },
//       {
//         id: 7787,
//         name: 'Katri Tempakka',
//         // imgSrc: imgStub
//       },
//       {
//         id: 7,
//         name: 'Anastasiia (Nasti) Skobkina',
//         // imgSrc: imgStub
//       },
//       {
//         id: 8,
//         name: 'Iida Välimäki',
//         // imgSrc: valimaki
//       },
//       {
//         id: 9,
//         name: 'Nova Kallio',
//         // imgSrc: imgStub
//       },
//       {
//         id: 12,
//         name: 'Valeria Velichko',
//         site: 'https://linktr.ee/snowycrowart',
//         // imgSrc: velichko
//       },
//       {
//         id: 44444234,
//         name: 'Markku Pyrrö',
//         // imgSrc: imgStub
//       },
//       {
//         id: 5432424234,
//         name: 'Joanna Lindström',
//         // imgSrc: lindstrom
//       },
//       {
//         id: 4366435325,
//         name: 'Krister Pohjanlehto',
//         site: 'https://krizzerart.artstation.com/',
//       },
//       {
//         id: 543535345,
//         name: 'Juho Ollila',
//         site: 'https://www.artstation.com/juhoollila',
//       },
//       {
//         id: 5435354545345,
//         name: 'Minna Niemi',
//       },
//       {
//         id: 42342359,
//         name: 'Anna Raevskaia',
//         site: 'https://www.artstation.com/annarae',
//       },
//       {
//         id: 423423553459,
//         name: 'Sonja Tähkänen',
//         site: 'https://www.artstation.com/annarae',
//       },
//       {
//         id: 65435435,
//         name: 'Rasmus Toikka',
//         // imgSrc: toikka
//       },
//       {
//         id: 98765432,
//         name: 'Ale Neppius',
//         site: 'https://aleneppius.artstation.com/',
//       },
//       {
//         id: 87654321,
//         name: 'Elvi Suonperä',
//         site: 'https://www.kimeelvi.com/',
//       },
//       {
//         id: 76543210,
//         name: 'Emma "Lilyawe"',
//         site: 'https://www.artstation.com/lilyawe',
//       },
//       {
//         id: 65432109,
//         name: 'Katriina Ruotsalainen',
//         site: 'https://miaskyelord.wixsite.com/katriina-ruotsalaine',
//       },
//       {
//         id: 54321098,
//         name: 'Luca Cannavò',
//         site: 'https://www.artstation.com/luca_cannavo',
//       },
//       {
//         id: 43210987,
//         name: 'Mariia Lassila',
//         site: 'https://mariialassila2000.wixsite.com/mariialassila',
//       },
//       {
//         id: 32109876,
//         name: 'S. M. K. Tähkänen',
//       },
//       {
//         id: 21098765,
//         name: 'Sandesh Neupane',
//         site: 'https://www.linkedin.com/in/sandeshneupane2055/',
//       },
//       {
//         id: 10987654,
//         name: 'Sirumilla Kotilainen',
//         site: 'https://sirumillakotilainen.webnode.fi/',
//       },
//       {
//         id: 9876543,
//         name: 'Suvi Hokkanen',
//         site: 'https://exanthe.wixsite.com/exanthesuvi',
//       },
//       {
//         id: 8765432,
//         name: 'Taru Teivonen',
//       },
//       {
//         id: 7654321,
//         name: 'Tuuli Kauppinen',
//       },
//       {
//         id: 6543210,
//         name: 'Stanislav Nefedov',
//         site: 'https://www.linkedin.com/in/stanislav-nefedov/',
//       },
//     ],
//   },

//   //--------------------------------------------------------------------
//   {
//     group: GroupType.GameCode,
//     workers: [
//       {
//         id: 13,
//         name: 'Jari Petäys',
//         github: 'jpetays',
//       },
//       {
//         id: 14,
//         name: 'Tomi Rämö',
//         github: 'TomiRam',
//       },
//       {
//         id: 15,
//         name: 'Pasi Ylärinne',
//         github: 'Bashwyck',
//       },
//       {
//         id: 16,
//         name: 'Elmeri Jatala',
//         github: 'Elmeri',
//         site: 'https://www.instagram.com/elkku045/',
//       },
//       {
//         id: 17,
//         name: 'Otto Ikonen',
//         github: 'OttoIkonen',
//       },
//       {
//         id: 18,
//         name: 'Lukas Järvelä',
//         github: 'ScrubMans',
//       },
//       {
//         id: 19,
//         name: 'Lassi Salo',
//       },
//       {
//         id: 9005,
//         name: 'Anna Hyttinen',
//       },
//       {
//         id: 8948,
//         name: 'Benjamin Wallenius',
//         site: 'https://www.linkedin.com/in/benkkuwln/',
//       },
//       {
//         id: 2414,
//         name: 'Haris Hussain',
//       },
//       {
//         id: 6911,
//         name: 'Joona Klaar',
//       },
//       {
//         id: 7673,
//         name: 'Marko Sulkunen',
//       },
//       {
//         id: 2274,
//         name: 'Markus Nummi',
//       },
//       {
//         id: 5330,
//         name: 'Niklas Bergström',
//       },
//       {
//         id: 2390,
//         name: 'Roope Grimm-Pohjanpalo',
//       },
//       {
//         id: 4598,
//         name: 'Samuli Salin',
//       },
//       {
//         id: 8846,
//         name: 'Ville Leino',
//       },
//       {
//         id: 7314,
//         name: 'William Rueter',
//       },
//       {
//         id: 2730,
//         name: 'Mikko Härkönen',
//         // imgSrc: harkonen
//       },
//       {
//         id: 3902,
//         name: 'Toni Peltonen',
//         site: 'www.linkedin.com/in/toni-peltonen-238a0b240',
//       },
//     ],
//   },

//   //--------------------------------------------------------------------

//   {
//     group: GroupType.APICode,
//     workers: [
//       {
//         id: 20,
//         name: 'Mikhail Deriabin',
//         github: 'MikhailDeriabin',
//         site: 'https://mikhail.hostaan.ac/',
//       },
//     ],
//   },

//   //--------------------------------------------------------------------

//   {
//     group: GroupType.WebPagesCode,
//     workers: [
//       {
//         id: 21,
//         name: 'Leo Hannolainen',
//         github: 'leolabdev',
//         site: 'https://leo-hannolainen.netlify.app/',
//         linkedin: 'https://www.linkedin.com/in/leo-hannolainen-860859205/',
//       },
//       {
//         id: 5515151111,
//         name: 'Joni Roine',
//         github: 'Jonroi',
//         site: 'https://datanomit.fi/TVT2023/jonroi/',
//         linkedin: 'https://www.linkedin.com/in/joni-roine/',
//       },
//     ],
//   },
//   {
//     //--------------------------------------------------------------------
//     group: GroupType.UserInterface,
//     workers: [
//       {
//         id: 2291918,
//         name: 'Aleksi Mäkelä',
//       },
//       {
//         id: 2423523452,
//         name: 'Amila Ranasinghe',
//       },
//       {
//         id: 551615615,
//         name: 'Vilhelmiina Piira',
//       },
//       {
//         id: 24235324,
//         name: 'Planks Wooden',
//         site: 'https://planksman.com/',
//       },
//       {
//         id: 24235322,
//         name: 'Janne Mähönen',
//         linkedin: 'https://www.linkedin.com/in/janne-mahonen-803419231',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------
//   {
//     group: GroupType.Sound,
//     workers: [
//       {
//         id: 22,
//         name: 'Otso Puhakka',
//         site: 'https://otsopuhakkasound.com/',
//       },
//       {
//         id: 2423523452,
//         name: 'Mikko Rainio',
//       },
//       {
//         id: 2423236858,
//         name: 'Jose Eronen',
//       },
//     ],
//   },

//   //--------------------------------------------------------------------
//   {
//     group: GroupType.Comics,
//     workers: [
//       {
//         id: 24,
//         name: 'Christian Lindholm',
//         site: 'https://peliprojektini.webnode.fi/',
//       },
//       {
//         id: 24346547,
//         name: 'Milo Keronen ',
//         site: 'https://mxmilo.wixsite.com/hiisikoloart',
//       },
//       {
//         id: 25654674645,
//         name: 'Suvi Palviainen',
//       },
//       {
//         id: 25654642374645,
//         name: 'Essi Tarvainen',
//       },
//     ],
//   },

//   //--------------------------------------------------------------------
//   {
//     group: GroupType.OthersComics,
//     workers: [
//       {
//         id: 43254023545,
//         name: 'Suvi Palviainen',
//       },
//       {
//         id: 424234,
//         name: 'Essi Tarvainen',
//       },

//       {
//         id: 42342413,
//         name: 'Milo Keronen',
//       },

//       {
//         id: 432425123,
//         name: 'Christian Lindholm',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------
//   {
//     group: GroupType.OthersGame,
//     workers: [
//       {
//         id: 252431421,
//         name: 'Markku Pyrrö',
//       },

//       {
//         id: 25,
//         name: 'Esa Pavloff-Pelkonen',
//       },
//       {
//         id: 26,
//         name: 'Suvi Palviainen',
//       },
//       {
//         id: 27,
//         name: 'Mikko Härkönen',
//       },
//       {
//         id: 29,
//         name: 'Sampo Rajala',
//       },
//       {
//         id: 30,
//         name: 'Kristian Turkki',
//       },
//       {
//         id: 31,
//         name: 'Sakari Pohjola',
//       },
//       {
//         id: 32,
//         name: 'Ale Neppius',
//       },
//       {
//         id: 33,
//         name: 'Oona Suikkanen',
//       },
//       {
//         id: 34,
//         name: 'Stanislav Nefedov',
//       },
//       {
//         id: 35,
//         name: 'Saku Remahl',
//       },
//       {
//         id: 36,
//         name: 'Mikael Eskonen',
//       },
//       {
//         id: 38,
//         name: 'Aleksi Saarinen',
//       },
//       {
//         id: 39,
//         name: 'Jay Heikkilä',
//       },
//       {
//         id: 40,
//         name: 'Sami Sobori',
//       },
//       {
//         id: 41,
//         name: 'Alice Grönholm',
//       },
//       {
//         id: 42,
//         name: 'Taru Hämäläinen',
//       },
//       {
//         id: 43,
//         name: 'Joni Rokkanen',
//       },
//       {
//         id: 44,
//         name: 'Jesse',
//       },
//       {
//         id: 45,
//         name: 'Anna-Maija Hyttinen',
//       },
//       {
//         id: 46,
//         name: 'Tiia Söderlund',
//       },
//       {
//         id: 47,
//         name: 'Andreas Julkunen',
//       },
//       {
//         id: 48,
//         name: 'Jarno Vartiainen',
//       },
//       {
//         id: 49,
//         name: 'Janika Suhonen',
//       },
//       {
//         id: 50,
//         name: 'Krista Puusti',
//       },
//       {
//         id: 51,
//         name: 'Pauliina Holopainen',
//       },
//       {
//         id: 52,
//         name: 'Ronnie Isomäki',
//       },
//       {
//         id: 152,
//         name: 'Pyry Siikjärvi',
//       },
//       {
//         id: 53,
//         name: 'Joni Miettinen',
//       },
//       {
//         id: 54,
//         name: 'Samuel Lindström',
//       },
//       {
//         id: 55,
//         name: 'Lauri Salmi',
//       },
//       {
//         id: 56,
//         name: 'William Rueter',
//       },
//       {
//         id: 57,
//         name: 'Samuel Käyhkö',
//       },
//       {
//         id: 58,
//         name: 'Stella Crawford',
//       },
//       {
//         id: 59,
//         name: 'Emilio Mäkipää',
//       },
//       {
//         id: 60,
//         name: 'Sebastian Lindgren',
//       },
//       {
//         id: 61,
//         name: 'Luca Cannavo',
//       },
//       {
//         id: 62,
//         name: 'Rikhard Liikanen',
//       },
//       {
//         id: 63,
//         name: 'Nana Siikava',
//       },
//       {
//         id: 64,
//         name: 'Jupiter Pitkänen',
//       },
//       {
//         id: 65,
//         name: 'Mille Rönkkö',
//       },
//       {
//         id: 66,
//         name: 'Anna-Maija Ratilainen',
//       },
//       {
//         id: 67,
//         name: 'Jere Koivisto',
//       },

//       {
//         id: 6743534524,
//         name: 'Elmeri Jatala',
//       },

//       {
//         id: 67435345,
//         name: 'Lucas Järvelä',
//       },

//       {
//         id: 6743534545,
//         name: 'Lassi Salo',
//       },

//       {
//         id: 6743574545,
//         name: 'Pasi Ylärinne',
//       },

//       {
//         id: 6743514545,
//         name: 'Aino Ulvi',
//       },

//       {
//         id: 6743514541,
//         name: 'Albert Rantala',
//       },

//       {
//         id: 6742514541,
//         name: 'Otto Ikonen',
//       },

//       {
//         id: 6742514543,
//         name: 'Nova Kallio',
//       },

//       {
//         id: 67425145434,
//         name: 'Anastasiia (Nasti) Skobkina',
//       },

//       {
//         id: 67425141434,
//         name: 'Janne Pyöriä',
//       },

//       {
//         id: 67425141438,
//         name: 'Katri Tempakka',
//       },

//       {
//         id: 674255435,
//         name: 'Milja Sissonen',
//       },

//       {
//         id: 3124124,
//         name: 'Valeria Velichko',
//       },

//       {
//         id: 32432563,
//         name: 'Iida Välimäki (Mehukatti)',
//       },

//       {
//         id: 3545353,
//         name: 'Santtu Syväsalmi',
//       },

//       {
//         id: 674535,
//         name: 'Ida (Rimppu)',
//       },
//       {
//         id: 6745355435,
//         name: 'Tarja Porkka-Kontturi',
//       },
//     ],
//   },
//   //--------------------------------------------------------------------
//   {
//     group: GroupType.Others,
//     workers: [
//       {
//         id: 72,
//         name: 'Anssi Ahola',
//       },
//       {
//         id: 73,
//         name: 'Olli Raudus',
//       },
//       {
//         id: 74,
//         name: 'Vesa Raudasoja',
//       },
//       {
//         id: 75,
//         name: 'Maria Kalliorinne',
//       },

//       {
//         id: 76,
//         name: 'Tuukka Lehkonen',
//       },

//       {
//         id: 77,
//         name: 'Susanna Viljanmaa',
//       },
//       {
//         id: 78,
//         name: 'Milsa Malin',
//       },

//       {
//         id: 81,
//         name: 'Milla Pennanen',
//       },
//       {
//         id: 82,
//         name: 'Henri Huttunen',
//       },
//       {
//         id: 83,
//         name: 'Maria Jauhiainen',
//       },
//       {
//         id: 84,
//         name: 'Tuuja Jänicke',
//       },
//       {
//         id: 85,
//         name: 'Jarno Paunonen',
//       },

//       {
//         id: 86,
//         name: 'Juko Leino',
//       },
//     ],
//   },
// ];
