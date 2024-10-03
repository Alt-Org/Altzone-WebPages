/**
 * This file provides API functions related to fetching team data, including teams,members, logos and departments.
 * It handles fetching data from Strapi, mapping the data to the correct types, and sorting teams accordingly.
 */

import { envHelper } from '@/shared/const/envHelper';
import { Team } from '@/entities/Member/model/types/types';
import { mapMembers, mapDepartments } from './mappers';

/**
 * Fetches a list of teams, including their members and departments, from the Strapi API.
 * @param locale The language locale to be used for fetching data. Defaults to 'en'.
 * @returns A Promise that resolves to an array of teams.
 */
export const fetchTeams = async (locale: string = 'en'): Promise<Team[]> => {
  try {
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';
    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}&populate=departments.localizations,members.Logo,departments.members.Logo`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching teams: ${response.statusText}`);
    }

    const teamData = await response.json();

    const teams: Team[] = teamData.data.map((item: any) => {
      let members = mapMembers(item.attributes.members?.data || []);
      const departments = mapDepartments(
        item.attributes.departments?.data || [],
        strapiLocale,
      );

      const departmentMemberIds = departments.flatMap((dept) =>
        dept.members.map((member) => member.id),
      );
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

    return teams.sort(
      (a: Team, b: Team) => order.indexOf(a.name) - order.indexOf(b.name),
    );
  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
};
