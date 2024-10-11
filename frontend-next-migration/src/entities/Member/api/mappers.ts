import { Member, Department } from '../model/types/types';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { envHelper } from '@/shared/const/envHelper';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';

/**
 * LinksMap provides a mapping of link types to FontAwesome icons.
 */
export const getLinks = () => ({
  website: faGlobe,
  github: faGithub,
  linkedin: faLinkedin,
  facebook: faFacebook,
  instagram: faInstagram,
  email: faEnvelope,
});

/**
 * Maps raw member data from the API response to the Member type used in the application.
 * Sorts members alphabetically by name.
 * @param membersData An array of raw member data from the API.
 * @returns An array of members mapped to the Member type.
 */
export const getMembers = (membersData: any[]): Member[] => {
  return (
    membersData
      .map((member: any) => {
        const logoUrl = member.attributes.Logo?.data?.attributes?.url
          ? `${envHelper.strapiHost}${member.attributes.Logo.data.attributes.url}`
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
      })
      .sort((a, b) => a.name.localeCompare(b.name)) || []
  );
};

/**
 * Maps raw department data from the API response to the Department type used in the application.
 * Sorts departments based on a predefined order depending on the locale.
 * @param departmentsData An array of raw department data from the API.
 * @param locale The language locale used to find the localized department name.
 * @returns An array of departments mapped to the Department type.
 */
export const getDepartments = (
  departmentsData: any[],
  locale: string,
): Department[] => {
  const orderEn = [
    'Lead Developers',
    'Game Developer',
    'Website Developer',
    'Developers',
    'Graphics',
    'Graphical Game Development',
    'Sound Design & Composition',
    'Sound Design-Oriented Game Development',
  ];

  const orderFi = [
    'Vastaava Ohjelmistokehittäjä',
    'Pelikehittäjä',
    'Verkkosivukehittäjä',
    'Ohjelmistokehittäjät',
    'Grafiikka',
    'Graafinen pelikehitys',
    'Äänisuunnittelu ja Sävellys',
    'Äänisuunnittelullinen Pelikehitys',
  ];

  const order = locale === 'fi' ? orderFi : orderEn;

  return (
    departmentsData
      .map((dept: any) => {
        const localizedDept = dept.attributes.localizations?.data.find(
          (loc: any) => loc.attributes.locale === locale,
        );

        const localizedDeptName = localizedDept
          ? localizedDept.attributes.Name
          : dept.attributes.Name;

        const members = getMembers(dept.attributes.members?.data || []);

        return {
          id: dept.id,
          name: localizedDeptName,
          members,
        };
      })
      .sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name)) || []
  );
};
