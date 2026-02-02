import { faGithub, faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Member, Team, MemberRole, Department } from '@/entities/Member/model/types/types';
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
 * Creates or retrieves a team from the teams map.
 */
const getOrCreateTeam = (
    teamsMap: Map<number, Team>,
    memberTeam: Team,
    fullLanguageCode: string,
): Team => {
    let team = teamsMap.get(memberTeam.id);
    if (!team) {
        const teamName = getTeamTranslation(memberTeam.translations || [], fullLanguageCode);
        team = {
            id: memberTeam.id,
            name: teamName || '',
            translations: memberTeam.translations || [],
            members: [],
            departments: [],
        };
        teamsMap.set(memberTeam.id, team);
    }
    return team;
};

/**
 * Creates or retrieves a department within a team.
 */
const getOrCreateDepartment = (
    team: Team,
    memberDepartment: Department,
    fullLanguageCode: string,
): Department => {
    let department = team.departments.find(
        (departmentItem) => departmentItem.id === memberDepartment.id,
    );
    if (!department) {
        const departmentName = getDepartmentTranslation(
            memberDepartment.translations || [],
            fullLanguageCode,
        );
        department = {
            id: memberDepartment.id,
            name: departmentName || '',
            translations: memberDepartment.translations || [],
            members: [],
        };
        team.departments.push(department);
    }
    return department;
};

/**
 * Adds a member to a team or department if not already present.
 */
const addMemberToTeamOrDepartment = (
    member: Member,
    team: Team,
    department: Department | null,
): void => {
    if (department) {
        if (!department.members.find((memberItem: Member) => memberItem.id === member.id)) {
            department.members.push(member);
        }
    } else {
        if (!team.members.find((memberItem: Member) => memberItem.id === member.id)) {
            team.members.push(member);
        }
    }
};

/**
 * Processes a single role and adds the member to the appropriate team/department.
 */
const processRole = (
    role: MemberRole,
    member: Member,
    teamsMap: Map<number, Team>,
    fullLanguageCode: string,
): void => {
    const memberTeam = role.team;
    if (!memberTeam) {
        return;
    }

    const team = getOrCreateTeam(teamsMap, memberTeam, fullLanguageCode);
    const memberDepartment = role.department;
    const department = memberDepartment
        ? getOrCreateDepartment(team, memberDepartment, fullLanguageCode)
        : null;

    addMemberToTeamOrDepartment(member, team, department);
};

/**
 * Organizes members into teams and departments based on their roles,
 * and sorts both the members alphabetically within their teams and departments,
 * as well as the teams based on a predefined order dictated by language.
 *
 * @param {Member[]} members - An array of member objects, each containing roles with team and department data.
 * @param {string} lng - The language code used to determine which language to use for translations and sorting.
 * @returns {OrganizedData} The organized data containing teams mapped by their IDs.
 */

export const organizeMembers = (members: Member[], lng: string) => {
    const teamsMap = new Map<number, Team>();
    const fullLanguageCode = getLanguageCode(lng);

    const order = lng === 'fi' ? fiOrder : enOrder;
    const departmentOrder = lng === 'fi' ? fiDepartmentOrder : enDepartmentOrder;

    members.forEach((member: Member) => {
        if (!member.roles || member.roles.length === 0) {
            return;
        }

        member.roles.forEach((role: MemberRole) => {
            processRole(role, member, teamsMap, fullLanguageCode);
        });
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
    // Sort teams according to predefined order
    // Teams not in the order array go to the end, sorted by name
    // Filter out teams with empty names
    const validTeams = Array.from(teamsMap.values()).filter(
        (team) => team.name && team.name.trim() !== '',
    );

    // Sort teams according to predefined order
    // Teams not in the order array go to the end, sorted by name
    const sortedTeams = validTeams.sort((a, b) => {
        const indexA = order.indexOf(a.name);
        const indexB = order.indexOf(b.name);

        // Both teams are in the order array - sort by position
        if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB;
        }

        // Team A is in order, Team B is not - A comes first
        if (indexA !== -1 && indexB === -1) {
            return -1;
        }

        // Team B is in order, Team A is not - B comes first
        if (indexA === -1 && indexB !== -1) {
            return 1;
        }

        // Neither team is in order array - sort alphabetically
        return a.name.localeCompare(b.name);
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
