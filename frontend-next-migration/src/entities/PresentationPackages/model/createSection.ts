import { PresentationSection } from '../types';

/**
 * Creates a new presentation section.
 *
 * @param {string} prefix - The prefix for the section titles and descriptions.
 * @param {number} index - The index of the section.
 * @param {string} imageSrc - The source URL of the image.
 * @param {string} imageAlt - The alternative text for the image.
 * @param {string} logoSrc - The source URL of the sidebar logo.
 * @param {string} logoAlt - The source URL of the sidebar logo.
 * @return {PresentationSection} - The newly created section.
 */
export function createSection(
  prefix: string,
  index: number,
  imageSrc: string,
  imageAlt: string,
  logoSrc: string,
  logoAlt: string,
): PresentationSection {
  return {
    id: `section${index + 1}`,
    label: `${prefix}-label`,
    description: `${prefix}-description`,
    image: imageSrc,
    imageAlt: imageAlt,
    sidebarLogo: logoSrc,
    sidebarLogoAlt: logoAlt,
  };
}
