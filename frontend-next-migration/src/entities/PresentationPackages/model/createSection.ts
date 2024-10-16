import { PresentationSection } from "../types";

// import { PresentationSection } from '../types';
//
// /**
//  * Creates a new presentation section.
//  *
//  * @param {string} prefix - The prefix for the section titles and descriptions.
//  * @param {number} index - The index of the section.
//  * @param {string} imageSrc - The source URL of the image.
//  * @param {string} imageAlt - The alternative text for the image.
//  * @param {string} logoSrc - The source URL of the sidebar logo.
//  * @param {string} logoAlt - The source URL of the sidebar logo.
//  * @return {PresentationSection} - The newly created section.
//  */
// export function createSection(
//   prefix: string,
//   index: number,
//   imageSrc: string,
//   imageAlt: string,
//   logoSrc: string,
//   logoAlt: string,
// ): PresentationSection {
//   return {
//     id: `section${index + 1}`,
//     label: `${prefix}-label`,
//     description: `${prefix}-description`,
//     image: imageSrc,
//     imageAlt: imageAlt,
//     sidebarLogo: logoSrc,
//     sidebarLogoAlt: logoAlt,
//   };
// }

interface SectionData {
  prefix: string;
  index: number;
  image: {
    src: string;
    alt: string;
  };
  logo: {
    src: string;
    alt: string;
  };
}

/**
 * Creates a new presentation section.
 *
 * @param {SectionData} data - The data required to create the presentation section.
 * @return {PresentationSection} - The newly created section.
 */
export function createSection(data: SectionData): PresentationSection {
  return {
    id: `section${data.index + 1}`,
    label: `${data.prefix}-label`,
    description: `${data.prefix}-description`,
    image: data?.image?.src,
    imageAlt: data?.image?.alt,
    sidebarLogo: data?.logo?.src,
    sidebarLogoAlt: data?.logo?.alt,
  };
}

