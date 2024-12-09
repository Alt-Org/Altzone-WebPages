import { organizeMembers } from './mappers';
import { Member, Team, Department } from '@/entities/Member/model/types/types';

const mockTeams: Team[] = [
    {
        id: 1,
        name: 'Development',
        translations: [
            { id: 101, teams_id: 1, languages_code: 'en-US', team: 'Development' },
            { id: 102, teams_id: 1, languages_code: 'fi-FI', team: 'Ohjelmistokehitys' },
        ],
        members: [],
        departments: [],
    },
    {
        id: 2,
        name: 'Game Design',
        translations: [
            { id: 103, teams_id: 2, languages_code: 'en-US', team: 'Game Design' },
            { id: 104, teams_id: 2, languages_code: 'fi-FI', team: 'Pelisuunnittelu' },
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
            team: mockTeams[0],
            department: {
                id: 10,
                name: 'Website Developer',
                translations: [
                    {
                        id: 110,
                        departments_id: 10,
                        languages_code: 'en-US',
                        department: 'Website Developer',
                    },
                    {
                        id: 111,
                        departments_id: 10,
                        languages_code: 'fi-FI',
                        department: 'Verkkosivukehittäjä',
                    },
                ],
                members: [],
            } as Department,
            translations: [],
        },
        {
            id: 2,
            name: 'Alice Smith',
            email: 'alice@example.com',
            github: 'https://github.com/AliceSmith',
            linkedin: 'https://www.linkedin.com/in/alice-smith/',
            website: 'https://alicesmith.com/',
            team: mockTeams[1],
            department: {
                id: 20,
                name: 'Game Developer',
                translations: [
                    {
                        id: 120,
                        departments_id: 20,
                        languages_code: 'en-US',
                        department: 'Game Developer',
                    },
                    {
                        id: 121,
                        departments_id: 20,
                        languages_code: 'fi-FI',
                        department: 'Pelikehittäjä',
                    },
                ],
                members: [],
            } as Department,
            translations: [],
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
