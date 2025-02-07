import { faGithub, faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Member, Team } from '@/entities/Member/model/types/types';
import { getDepartmentTranslation, getTeamTranslation, getLanguageCode } from './translations';

/**
 * Provides a set of icon links for various platforms.
 *
 * @returns {object} An object containing font-awesome icons for different links.
 */
export const getLinks = () => {
    return {
        website: faGlobe,
        github: faGithub,
        linkedin: faLinkedin,
        facebook: faFacebook,
        instagram: faInstagram,
        email: faEnvelope,
    };
};

/**
 * Represents the organized data structure containing teams and departments.
 *
 * @typedef {Object} OrganizedData
 * @property {Map<number, Team>} teamsMap - A map associating team IDs with team objects,
 *                                           organized according to their translation and language preference.
 */

/**
 * Organizes members into teams and departments based on their properties,
 * and sorts both the members alphabetically within their teams and departments,
 * as well as the teams based on a predefined order dictated by language.
 *
 * @param {Member[]} members - An array of member objects, each containing associated team and department data.
 * @param {string} lng - The language code used to determine which language to use for translations and sorting.
 * @returns {OrganizedData} The organized data containing teams mapped by their IDs.
 */
export const organizeMembers = (members: Member[], lng: string) => {
    const teamsMap = new Map<number, Team>();
    const fullLanguageCode = getLanguageCode(lng);

    const enOrder = [
        'Game Design',
        'Mentoring',
        'Development',
        'Graphics',
        'Writers',
        'Sounds',
        'Comic Book',
        'Production',
        'Analysis',
        'Game Art Education Package',
        'Other Participants',
        'Special Thanks',
    ];

    const fiOrder = [
        'Pelisuunnittelu',
        'Mentorointi',
        'Ohjelmistokehitys',
        'Grafiikka',
        'Kirjoittajat',
        'Äänet',
        'Sarjakuva',
        'Tuotanto',
        'Analyysi',
        'Pelitaiteen Opetuspaketti',
        'Muut Mukana Olleet',
        'Erityiskiitokset',
    ];

    const order = lng === 'fi' ? fiOrder : enOrder;

    members.forEach((member: Member) => {
        const memberTeam = member.team;
        const memberDepartment = member.department;

        if (memberTeam) {
            let team = teamsMap.get(memberTeam.id);
            if (!team) {
                const teamName = getTeamTranslation(
                    memberTeam.translations || [],
                    fullLanguageCode,
                );

                team = { ...memberTeam, name: teamName, members: [], departments: [] };
                teamsMap.set(memberTeam.id, team);
            }

            if (memberDepartment) {
                let department = team.departments.find(
                    (departmentItem) => departmentItem.id === memberDepartment.id,
                );
                if (!department) {
                    const departmentName = getDepartmentTranslation(
                        memberDepartment.translations || [],
                        fullLanguageCode,
                    );

                    department = { ...memberDepartment, name: departmentName, members: [] };
                    team.departments.push(department);
                }

                department.members.push(member);
            } else {
                team.members.push(member);
            }
        }
    });
    teamsMap.forEach((team) => {
        team.members.sort((a, b) => a.name.localeCompare(b.name));
        team.departments.forEach((department) => {
            department.members.sort((a, b) => a.name.localeCompare(b.name));
        });
    });
    const sortedTeams = Array.from(teamsMap.values()).sort((a, b) => {
        const indexA = order.indexOf(a.name);
        const indexB = order.indexOf(b.name);
        return indexA - indexB;
    });

    return { teamsMap: new Map(sortedTeams.map((team) => [team.id, team])) };
};
