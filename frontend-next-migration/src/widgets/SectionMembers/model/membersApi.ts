import { envHelper } from '@/shared/const/envHelper';

// Interfaces
export interface Member {
  id: number;
  name: string;
  task?: string;
  email?: string;
  logo?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  facebook?: string;
  instagram?: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
}

export interface Department {
  id: number;
  name: string;
  members: Member[];
}

export interface Team {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  locale: string;
  members: Member[];
  departments: Department[];
}

// Function to map members
const mapMembers = (membersData: any[]): Member[] => {
  return (
    membersData.map((member: any) => ({
      id: member.id,
      name: member.attributes.Name,
      task: member.attributes.Task,
      email: member.attributes.Email,
      linkedin: member.attributes.Linkedin,
      website: member.attributes.Website,
      github: member.attributes.Github,
      logo: member.attributes.Logo,
      facebook: member.attributes.Facebook,
      instagram: member.attributes.Instagram,
      createdAt: member.attributes.createdAt,
      updatedAt: member.attributes.updatedAt,
      locale: member.attributes.locale,
    })) || []
  );
};

// Function to map departments
const mapDepartments = (
  departmentsData: any[],
  locale: string,
): Department[] => {
  return (
    departmentsData.map((dept: any) => {
      // Look for localized department name
      const localizedDeptName =
        dept.attributes.localizations?.data.find(
          (loc: any) => loc.attributes.locale === locale,
        )?.attributes.Department || dept.attributes.Department;

      const members = mapMembers(dept.attributes.members?.data || []);

      return {
        id: dept.id,
        name: localizedDeptName,
        members,
      };
    }) || []
  );
};

// Fetch Teams
export const fetchTeams = async (locale: string = 'en'): Promise<Team[]> => {
  try {
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}&populate=departments.members,members`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching teams: ${response.statusText}`);
    }

    const teamData = await response.json();

    const teams: Team[] = teamData.data.map((item: any) => {
      const members = mapMembers(item.attributes.members?.data || []);
      const departments = mapDepartments(
        item.attributes.departments?.data || [],
        strapiLocale,
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

    const order = locale === 'fi' ? orderFi : orderEn;

    return teams.sort(
      (a: Team, b: Team) => order.indexOf(a.name) - order.indexOf(b.name),
    );
  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
};

// Fetch Departments independently if needed
export const fetchDepartments = async (
  locale: string = 'en',
): Promise<Department[]> => {
  try {
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    const response = await fetch(
      `${envHelper.strapiApiUrl}/departments?locale=${strapiLocale}&populate=*`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching departments: ${response.statusText}`);
    }

    const departmentData = await response.json();

    return mapDepartments(departmentData.data || [], strapiLocale);
  } catch (error) {
    console.error('Error fetching departments data:', error);
    return [];
  }
};
