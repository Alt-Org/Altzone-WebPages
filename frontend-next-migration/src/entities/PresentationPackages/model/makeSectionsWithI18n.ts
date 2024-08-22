import { PresentationSection } from '@/entities/PresentationPackages/types';
import { CookiesSections } from './data/cookiesSections';
import { ArtGameSections } from './data/artGameSections';
import { PrivacySections } from './data/privacySections';
import { TeachingSections } from './data/teachingSections';

/**
 * Takes an array of PresentationSections and returns a higher-order function that takes a translation function
 * and returns an array of PresentationSections with localized labels and descriptions.
 *
 * @param {PresentationSection[]} sections - The array of PresentationSections to localize.
 * @returns {Function} A higher-order function that takes a translation function.
 * @return {PresentationSection[]} An array of localized PresentationSections.
 */
const makeSectionsWithI18n = (
  sections: PresentationSection[],
): ((t: (key: string) => string) => PresentationSection[]) => {
  return (t: (key: string) => string): PresentationSection[] => {
    return sections.map((section) => ({
      ...section,
      label: t(section.label),
      description: t(section.description),
      image: section.image,
      imageAlt: t(section.imageAlt),
      sidebarLogo: section.sidebarLogo,
      sidebarLogoAlt: t(section.sidebarLogoAlt),
    }));
  };
};

/**
 * Creates teaching sections with internationalization support.
 *
 * @param {Array} TeachingSections - The array of teaching sections.
 * @returns {Array} - The array of teaching sections with internationalization support.
 */
export const makeTeachingSectionsWithI18n =
  makeSectionsWithI18n(CookiesSections);

/**
 * Creates art game sections with internationalization support.
 *
 * @param {Array} ArtGameSections - The array of art game sections.
 * @returns {Array} - The array of art game sections with internationalization support.
 */
export const makeArtGameSectionsWithI18n =
  makeSectionsWithI18n(ArtGameSections);
/**
 * Creates cookies sections with internationalization support.
 *
 * @param {Array} CookiesSections - The array of art game sections.
 * @returns {Array} - The array of art game sections with internationalization support.
 */
export const makeCookiesSectionsWithI18n =
  makeSectionsWithI18n(CookiesSections);

/**
 * Creates privacy sections with internationalization support.
 *
 * @param {Array} PrivacySections - The array of art game sections.
 * @returns {Array} - The array of art game sections with internationalization support.
 */
export const makePrivacySectionsWithI18n =
  makeSectionsWithI18n(PrivacySections);
