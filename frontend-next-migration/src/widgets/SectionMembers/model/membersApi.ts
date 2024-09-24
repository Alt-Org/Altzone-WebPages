/* This TypeScript code defines an interface `TeamMember` representing the structure of a team member
object. It includes properties like id, Role, Task, Name, Email, Logo, Website, Github, Linkedin,
createdAt, updatedAt, publishedAt, and locale. */
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
  Part: string;
}

/**
 * Fetch team members from Strapi based on the locale (language).
 * @param locale - Language code ('en' or 'fi')
 */
export const fetchTeamMembers = async (
  locale: string = 'en',
): Promise<TeamMember[]> => {
  try {
    const strapiLocale = locale === 'fi' ? 'fi-FI' : 'en';

    const response = await fetch(
      `${envHelper.strapiApiUrl}/teams?locale=${strapiLocale}&populate=*`,
    );

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();

    /* This part of the code is mapping over the array of team members fetched from the Strapi API and
    transforming each item into a new object with specific properties. Here's a breakdown of what
    it's doing: */
    return data.data.map((item: any) => {
      const attributes = item.attributes;
      const logoData = attributes.Logo?.data;
      const logoUrl = logoData
        ? `${envHelper.strapiHost.replace(/\/$/, '')}${
            logoData.attributes.formats?.thumbnail?.url
          }`
        : null;

      return {
        id: item.id,
        Role: attributes.Role,
        Task: attributes.Task,
        Name: attributes.Name,
        Email: attributes.Email,
        Logo: logoUrl,
        Website: attributes.Website,
        Github: attributes.Github,
        Linkedin: attributes.Linkedin,
        createdAt: attributes.createdAt,
        updatedAt: attributes.updatedAt,
        publishedAt: attributes.publishedAt,
        locale: attributes.locale,
        Part: attributes.Part || '',
      };
    }) as TeamMember[];
  } catch (error) {
    throw new Error('Error fetching team members data');
  }
};
