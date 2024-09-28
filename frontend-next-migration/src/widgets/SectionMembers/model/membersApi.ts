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

// Function to map departments and ensure the correct members are assigned
const mapDepartments = (
  departmentsData: any[],
  locale: string,
): Department[] => {
  return (
    departmentsData.map((dept: any) => {
      // Find the localized name if available
      const localizedDept = dept.attributes.localizations?.data.find(
        (loc: any) => loc.attributes.locale === locale,
      );

      const localizedDeptName = localizedDept
        ? localizedDept.attributes.Name
        : dept.attributes.Name;

      // Map the members that are explicitly part of this department
      const members = mapMembers(dept.attributes.members?.data || []);

      return {
        id: dept.id,
        name: localizedDeptName,
        members, // Explicitly assign members that belong to this department
      };
    }) || []
  );
};

// Fetch Teams
export const fetchTeams = async (locale: string = 'en'): Promise<Team[]> => {
  try {
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    // Fetch data including localized departments and members
    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}&populate=departments.localizations,members,departments.members`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching teams: ${response.statusText}`);
    }

    const teamData = await response.json();

    // Map teams and assign their respective members and departments
    const teams: Team[] = teamData.data.map((item: any) => {
      // Map team-level members (members who are not part of any specific department)
      let members = mapMembers(item.attributes.members?.data || []);

      // Map departments related to the team
      const departments = mapDepartments(
        item.attributes.departments?.data || [],
        strapiLocale,
      );

      // Collect all member IDs that are assigned to departments
      const departmentMemberIds = departments.flatMap((dept) =>
        dept.members.map((member) => member.id),
      );

      // Filter out members from team-level members that are already in a department
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

    // Order teams by predefined lists
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

    // Sort teams based on the order
    return teams.sort(
      (a: Team, b: Team) => order.indexOf(a.name) - order.indexOf(b.name),
    );
  } catch (error) {
    console.error('Error fetching teams data:', error);
    return [];
  }
};