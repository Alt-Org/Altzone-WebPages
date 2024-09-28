// mappers.ts

/**
 * This file contains mapping functions used to transform data from the API response
 * into a format that matches the application's data models.
 * It includes functions for mapping members and departments.
 */

import { Member, Department } from './types';

/**
 * Maps raw member data from the API response to the Member type used in the application.
 * @param membersData An array of raw member data from the API.
 * @returns An array of members mapped to the Member type.
 */
export const mapMembers = (membersData: any[]): Member[] => {
  return (
    membersData.map((member: any) => {
      /**
       * Construct the logo URL if logo data is available
       */
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

/**
 * Maps raw department data from the API response to the Department type used in the application.
 * It ensures that the correct members are assigned to each department.
 * @param departmentsData An array of raw department data from the API.
 * @param locale The language locale used to find the localized department name.
 * @returns An array of departments mapped to the Department type.
 */
export const mapDepartments = (
  departmentsData: any[],
  locale: string,
): Department[] => {
  return (
    departmentsData.map((dept: any) => {
      /**
       * Find the localized name if available, otherwise use the default name
       */
      const localizedDept = dept.attributes.localizations?.data.find(
        (loc: any) => loc.attributes.locale === locale,
      );

      const localizedDeptName = localizedDept
        ? localizedDept.attributes.Name
        : dept.attributes.Name;

      /**
       * Map the members that are explicitly part of this department, including logo information
       */
      const members = mapMembers(dept.attributes.members?.data || []);

      return {
        id: dept.id,
        name: localizedDeptName,
        members,
      };
    }) || []
  );
};
