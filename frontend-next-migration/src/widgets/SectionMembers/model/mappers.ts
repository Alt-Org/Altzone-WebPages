import { Member, Department } from './types';

export const mapMembers = (membersData: any[]): Member[] => {
  return (
    membersData.map((member: any) => {
      const logoUrl = member.attributes.Logo?.data?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_HOST}${member.attributes.Logo.data.attributes.url}`
        : null;

      return {
        id: member.id,
        name: member.attributes.Name,
        task: member.attributes.Task,
        email: member.attributes.Email,
        linkedin: member.attributes.Linkedin,
        website: member.attributes.Website,
        github: member.attributes.Github,
        logo: logoUrl,
        facebook: member.attributes.Facebook,
        instagram: member.attributes.Instagram,
        createdAt: member.attributes.createdAt,
        updatedAt: member.attributes.updatedAt,
        locale: member.attributes.locale,
      };
    }) || []
  );
};

// Function to map departments and ensure the correct members are assigned
export const mapDepartments = (
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

      // Map the members that are explicitly part of this department, including logo information
      const members = mapMembers(dept.attributes.members?.data || []);

      return {
        id: dept.id,
        name: localizedDeptName,
        members,
      };
    }) || []
  );
};
