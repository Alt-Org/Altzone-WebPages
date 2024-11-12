/**
 * Represents a content block section with essential details, including label, description,
 * a URL link, and link text.
 *
 * @interface BlockSection
 *
 * @property {string} label - The title or label for the block.
 * @property {string} description - A description providing additional information about the block content.
 * @property {string} link - The URL to be associated with this block, used for navigation.
 * @property {string} linkText - The clickable text for the link.
 */
export interface BlockSection {
    label: string;
    description: string;
    link: string;
    linkText: string;
}
