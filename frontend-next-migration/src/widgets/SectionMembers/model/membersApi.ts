import { envHelper } from '@/shared/const/envHelper';

export interface Member {
  id: number;
  Name: string;
  Task?: string;
  Email?: string;
  Logo?: string;
  Website?: string;
  Github?: string;
  Linkedin?: string;
  Facebook?: string;
  Instagram?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export interface Department {
  id: number;
  Name: string;
  members: Member[]; // Lisää jäsenet
}

export interface Team {
  members: any;
  id: number;
  Name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  departments: Department[]; // Lisää osastot
}

/**
 * Fetch teams from Strapi based on the locale (language).
 * @param locale - Language code ('en' or 'fi')
 */
export const fetchTeams = async (locale: string = 'en'): Promise<Team[]> => {
  try {
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}&populate=departments.members,members`, // Populate members directly from both team and departments
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const teamData = await response.json();

    // Map teams
    const teams: Team[] = teamData.data.map((item: any) => {
      // Get members directly from the team object
      const members =
        item.attributes.members?.data.map((member: any) => ({
          id: member.id,
          Name: member.attributes.Name,
          Task: member.attributes.Task,
          Email: member.attributes.Email,
          Linkedin: member.attributes.Linkedin,
          Website: member.attributes.Website,
          Github: member.attributes.Github,
          Logo: member.attributes.Logo,
          Facebook: member.attributes.Facebook,
          Instagram: member.attributes.Instagram,
          createdAt: member.attributes.createdAt,
          updatedAt: member.attributes.updatedAt,
          locale: member.attributes.locale,
        })) || [];

      // Map departments and assign members to their respective departments
      const departments =
        item.attributes.departments?.data.map((dept: any) => {
          const departmentMembers =
            dept.attributes.members?.data.map((member: any) => ({
              id: member.id,
              Name: member.attributes.Name,
              Task: member.attributes.Task,
              Email: member.attributes.Email,
              Linkedin: member.attributes.Linkedin,
              Website: member.attributes.Website,
              Github: member.attributes.Github,
              Logo: member.attributes.Logo,
              Facebook: member.attributes.Facebook,
              Instagram: member.attributes.Instagram,
              createdAt: member.attributes.createdAt,
              updatedAt: member.attributes.updatedAt,
              locale: member.attributes.locale,
            })) || []; // Extract members for each department

          return {
            id: dept.id,
            Name: dept.attributes.Department,
            members: departmentMembers, // Assign members to department
          };
        }) || [];

      return {
        id: item.id,
        Name: item.attributes.Team,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
        publishedAt: item.attributes.publishedAt,
        locale: item.attributes.locale,
        members, // Team members (if no departments)
        departments, // Departments and their members
      };
    });

    // Define custom ordering for both English and Finnish locales
    const orderEn = [
      'Game Design',
      'Mentoring',
      'Sounds',
      'Programming',
      'Graphics',
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

    // Select the correct order based on locale
    const order = locale === 'fi' ? orderFi : orderEn;

    return teams.sort((a: Team, b: Team) => {
      const indexA = order.indexOf(a.Name);
      const indexB = order.indexOf(b.Name);
      return indexA - indexB;
    });
  } catch (error) {
    throw new Error('Error fetching teams data');
  }
};
