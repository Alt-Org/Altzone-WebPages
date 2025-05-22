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

const enOrder = [
    'Design Team',
    'Technical Team',
    'Artistic Team',
    'Art Education',
    'Production',
    'Community Management',
    'Community Content',
    'Participated in the Development of the Project',
    'Special Thanks',
];

const fiOrder = [
    'Suunnittelutiimi',
    'Tekninen Tiimi',
    'Taiteellinen Tiimi',
    'Taidekasvatus',
    'Tuotanto',
    'Yhteisömanagerointi',
    'Yhteisösisältö',
    'Projektin Kehityksessä Mukana Olleet',
    'Erityiskiitokset',
];

// Define department order for each language
const enDepartmentOrder = [
    'Coreteam',
    'Lead Developer',
    'API Developers',
    'Developers',
    'Testing and Analytics',
    'Technical Mentoring',
    'Artistic Director',
    'Graphics',
    'Sound Design and Composition',
    'Screenwriting',
    'Comic Book Artist',
    'Artistic Mentorship',
];

const fiDepartmentOrder = [
    'Ydintiimi',
    'Vastaavat Ohjelmistokehittäjät',
    'API Ohjelmoijat',
    'Ohjelmoijat',
    'Testaus ja Analytiikka',
    'Tekninen Mentorointi',
    'Taiteellinen Vastaava',
    'Grafiikka',
    'Äänisuunnittelu ja Sävellys',
    'Käsikirjoitus',
    'Sarjakuvataiteilija',
    'Taiteellinen Mentorointi',
];

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

    const order = lng === 'fi' ? fiOrder : enOrder;
    const departmentOrder = lng === 'fi' ? fiDepartmentOrder : enDepartmentOrder;

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

        // Sort departments within each team according to departmentOrder
        team.departments.sort((a, b) => {
            const indexA = departmentOrder.indexOf(a.name);
            const indexB = departmentOrder.indexOf(b.name);

            // If department is not in the order array, place it at the end
            if (indexA === -1 && indexB === -1) {
                return a.name.localeCompare(b.name); // Alphabetical if neither is in order list
            }
            if (indexA === -1) return 1; // a not in list, b in list
            if (indexB === -1) return -1; // a in list, b not in list

            return indexA - indexB; // Both in list, sort by position
        });

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

/**
 * Organizes teams based on a predefined order dictated by language.
 *
 * @param {Record<any, string>[]} teamProps - An array of team records, containing label and id.
 * @param {string} lng - The language code used to determine which language to use for translations and sorting.
 * @returns {Record<any, string>[]} The organized teams mapped by their IDs.
 */

export const organizeTeams = (teamProps: Record<any, string>[], lng: string) => {
    const order = lng === 'fi' ? fiOrder : enOrder;

    const sortedTeams = Array.from(teamProps).sort((a, b) => {
        const indexA = order.indexOf(a.label);
        const indexB = order.indexOf(b.label);
        return indexA - indexB;
    });

    return sortedTeams;
};

/**
 * Organizes departments based on a predefined order dictated by language.
 *
 * @param {Record<any, string>[]} departmentProps - An array of department records, containing label and id.
 * @param {string} lng - The language code used to determine which language to use for translations and sorting.
 * @returns {Record<any, string>[]} The organized departments mapped by their IDs.
 */

export const organizeDepartments = (departmentProps: Record<any, string>[], lng: string) => {
    const order = lng === 'fi' ? fiDepartmentOrder : enDepartmentOrder;

    const sortedDepartments = Array.from(departmentProps).sort((a, b) => {
        const indexA = order.indexOf(a.label);
        const indexB = order.indexOf(b.label);
        return indexA - indexB;
    });

    return sortedDepartments;
};
