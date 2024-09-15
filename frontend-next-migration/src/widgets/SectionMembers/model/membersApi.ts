const BASE_URL = 'http://localhost:1337/api';

export interface TeamMember {
  id: number;
  Role: string;
  Name: string;
  Email: string;
  Logo?: string;
  website?: string;
  github?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const response = await fetch(`${BASE_URL}/teams`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    const members = Array.isArray(data.data) ? data.data : [data.data];

    return members.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    })) as TeamMember[];
  } catch (error) {
    throw new Error('Error fetching team members data');
  }
};
