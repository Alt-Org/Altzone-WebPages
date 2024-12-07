import { faGithub, faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Member, Team, Department } from '@/entities/Member/model/types/types';

export const getLinks = () => ({
    website: faGlobe,
    github: faGithub,
    linkedin: faLinkedin,
    facebook: faFacebook,
    instagram: faInstagram,
    email: faEnvelope,
});

export interface OrganizedData {
    teamsMap: Map<number, Team>;
    unmatchedDepartments: Department[];
}

export const organizeMembers = (members: Member[], lng: string) => {
    const teamsMap = new Map<number, Team>();
    const unmatchedDepartments: Department[] = [];

    members.forEach((member: Member) => {
        const memberTeam = member.team;
        const memberDepartment = member.department;

        if (memberTeam) {
            let team = teamsMap.get(memberTeam.id);
            if (!team) {
                const teamNameTranslation = memberTeam.translations.find(
                    (t) => t.languages_code === lng,
                );

                const teamName = teamNameTranslation
                    ? teamNameTranslation.team
                    : memberTeam.translations[0]?.team || 'Unnamed';

                team = { ...memberTeam, name: teamName, members: [], departments: [] };
                teamsMap.set(memberTeam.id, team);
            }
            if (memberDepartment) {
                let department = team.departments.find((d) => d.id === memberDepartment.id);
                if (!department) {
                    department = { ...memberDepartment, members: [] };
                    team.departments.push(department);
                }
                // Add the member to the department only
                department.members.push(member);
            } else {
                // Add member to the team-level member list if no department
                team.members.push(member);
            }
        }
    });

    return { teamsMap, unmatchedDepartments };
};
