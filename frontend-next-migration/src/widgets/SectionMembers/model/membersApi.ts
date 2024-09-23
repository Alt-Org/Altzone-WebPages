import { envHelper } from '@/shared/const/envHelper';

export interface TeamMember {
  id: number;
  Role: string;
  Task?: string;
  Name: string;
  Email?: string;
  Logo?: string;
  Website?: string;
  Github?: string;
  Linkedin?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}

/**
 * Fetch team members from Strapi based on the locale (language).
 * @param locale - Language code ('en' or 'fi')
 */
export const fetchTeamMembers = async (
  locale: string = 'en',
): Promise<TeamMember[]> => {
  try {
    // Convert short locale code to full Strapi locale code
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    // Fetch data from Strapi based on the detected locale using the environment variable for BASE_URL
    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    // Map the response data to your TeamMember interface
    return data.data.map((item: any) => ({
      id: item.id,
      ...item.attributes,
    })) as TeamMember[];
  } catch (error) {
    throw new Error('Error fetching team members data');
  }
};
