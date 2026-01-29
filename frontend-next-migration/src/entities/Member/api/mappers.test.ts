import { organizeMembers } from './mappers';
import { Member, Team, Department, MemberRole } from '@/entities/Member/model/types/types';

const mockTeams: Team[] = [
    {
        id: 1,
        name: 'Development',
        translations: [
            { id: 101, teams_v2_id: 1, languages_code: 'en-US', name: 'Development' },
            { id: 102, teams_v2_id: 1, languages_code: 'fi-FI', name: 'Ohjelmistokehitys' },
        ],
        members: [],
        departments: [],
    },
    {
        id: 2,
        name: 'Game Design',
        translations: [
            { id: 103, teams_v2_id: 2, languages_code: 'en-US', name: 'Game Design' },
            { id: 104, teams_v2_id: 2, languages_code: 'fi-FI', name: 'Pelisuunnittelu' },
        ],
        members: [],
        departments: [],
    },
];

describe('organizeMembers', () => {
    const mockMembers: Member[] = [
        {
            id: 1,
            name: 'Joni Roine',
            email: 'joni@example.com',
            github: 'https://github.com/Jonroi',
            linkedin: 'https://www.linkedin.com/in/joni-roine/',
            website: 'https://jonroi.netlify.app/',
            roles: [
                {
                    id: 1,
                    team: mockTeams[0],
                    department: {
                        id: 10,
                        name: 'Website Developer',
                        translations: [
                            {
                                id: 110,
                                departments_v2_id: 10,
                                languages_code: 'en-US',
                                name: 'Website Developer',
                            },
                            {
                                id: 111,
                                departments_v2_id: 10,
                                languages_code: 'fi-FI',
                                name: 'Verkkosivukehittäjä',
                            },
                        ],
                        members: [],
                    } as Department,
                    translations: [],
                } as MemberRole,
            ],
        },
        {
            id: 2,
            name: 'Alice Smith',
            email: 'alice@example.com',
            github: 'https://github.com/AliceSmith',
            linkedin: 'https://www.linkedin.com/in/alice-smith/',
            website: 'https://alicesmith.com/',
            roles: [
                {
                    id: 2,
                    team: mockTeams[1],
                    department: {
                        id: 20,
                        name: 'Game Developer',
                        translations: [
                            {
                                id: 120,
                                departments_v2_id: 20,
                                languages_code: 'en-US',
                                name: 'Game Developer',
                            },
                            {
                                id: 121,
                                departments_v2_id: 20,
                                languages_code: 'fi-FI',
                                name: 'Pelikehittäjä',
                            },
                        ],
                        members: [],
                    } as Department,
                    translations: [],
                } as MemberRole,
            ],
        },
    ];

    it('should organize members into teams and departments with correct English translations', () => {
        const result = organizeMembers(mockMembers, 'en');

        const developmentTeam = result.teamsMap.get(1);
        expect(developmentTeam).toBeDefined();
        if (developmentTeam) {
            expect(developmentTeam.name).toBe('Development');
            expect(developmentTeam.departments[0].name).toBe('Website Developer');
            expect(developmentTeam.departments[0].members[0].name).toBe('Joni Roine');
        }

        const designTeam = result.teamsMap.get(2);
        expect(designTeam).toBeDefined();
        if (designTeam) {
            expect(designTeam.name).toBe('Game Design');
            expect(designTeam.departments[0].name).toBe('Game Developer');
            expect(designTeam.departments[0].members[0].name).toBe('Alice Smith');
        }
    });

    it('should organize members into teams and departments with correct Finnish translations', () => {
        const result = organizeMembers(mockMembers, 'fi');

        const developmentTeam = result.teamsMap.get(1);
        expect(developmentTeam).toBeDefined();
        if (developmentTeam) {
            expect(developmentTeam.name).toBe('Ohjelmistokehitys');
            expect(developmentTeam.departments[0].name).toBe('Verkkosivukehittäjä');
            expect(developmentTeam.departments[0].members[0].name).toBe('Joni Roine');
        }

        const designTeam = result.teamsMap.get(2);
        expect(designTeam).toBeDefined();
        if (designTeam) {
            expect(designTeam.name).toBe('Pelisuunnittelu');
            expect(designTeam.departments[0].name).toBe('Pelikehittäjä');
            expect(designTeam.departments[0].members[0].name).toBe('Alice Smith');
        }
    });

    it('should return an empty teams map if no members are provided', () => {
        const result = organizeMembers([], 'en');
        expect(result.teamsMap.size).toBe(0);
    });
});
