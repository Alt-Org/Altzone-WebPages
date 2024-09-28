// membersApi.ts

/**
 * This file provides API functions related to fetching team data, including members and departments.
 * It handles fetching data from Strapi, mapping the data to the correct types, and sorting teams accordingly.
 */

import { envHelper } from '@/shared/const/envHelper';
import { Member, Team } from '../model/types';
import { mapMembers, mapDepartments } from '../model/mappers';

/**
 * Fetches a list of teams, including their members and departments, from the Strapi API.
 * @param locale The language locale to be used for fetching data. Defaults to 'en'.
 * @returns A Promise that resolves to an array of teams.
 */
export const fetchTeams = async (locale: string = 'en'): Promise<Team[]> => {
  try {
    /**
     * Determine the Strapi locale based on the input locale
     */
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    /**
     * Fetch data including localized departments and members with their logos
     */
    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}&populate=departments.localizations,members.Logo,departments.members.Logo`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching teams: ${response.statusText}`);
    }

    const teamData = await response.json();

    /**
     * Map teams and assign their respective members and departments
     */
    const teams: Team[] = teamData.data.map((item: any) => {
      /**
       * Map team-level members (members who are not part of any specific department)
       */
      let members = mapMembers(item.attributes.members?.data || []);

      /**
       * Map departments related to the team
       */
      const departments = mapDepartments(
        item.attributes.departments?.data || [],
        strapiLocale,
      );

      /**
       * Collect all member IDs that are assigned to departments
       */
      const departmentMemberIds = departments.flatMap((dept) =>
        dept.members.map((member) => member.id),
      );

      /**
       * Filter out members from team-level members that are already in a department
       */
      members = members.filter(
        (member) => !departmentMemberIds.includes(member.id),
      );

      return {
        id: item.id,
        name: item.attributes.Team || item.attributes.Name,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        locale: item.attributes.locale,
        members,
        departments,
      };
    });

    /**
     * Define the order for teams based on the locale
     */
    const orderEn = [
      'Game Design',
      'Mentoring',
      'Programming',
      'Graphics',
      'Sounds',
      'Comic book',
      'Production',
      'Analysis',
      'Art',
      'Game Art Education Package',
      'Other Participants',
      'Special Thanks',
    ];

    const orderFi = [
      'Pelisuunnittelu',
      'Mentorointi',
      'Ohjelmointi',
      'Grafiikka',
      'Äänet',
      'Sarjakuva',
      'Tuotanto',
      'Analyysi',
      'Pelitaiteen opetuspaketti',
      'Muut mukana olleet',
      'Erityiskiitokset',
    ];

    const order = locale === 'fi' ? orderFi : orderEn;

    /**
     * Sort teams based on the predefined order
     */
    return teams.sort(
      (a: Team, b: Team) => order.indexOf(a.name) - order.indexOf(b.name),
    );
  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
};
