import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import cls from './SocialMediaIcons.module.scss';

const SoMeIcons = {
    website: faGlobe,
    github: faGithub,
    linkedin: faLinkedin,
    facebook: faFacebook,
    instagram: faInstagram,
};

interface SocialMediaIconsProps {
    links: { name: 'website' | 'github' | 'linkedin' | 'facebook' | 'instagram'; url: string }[];
}

/**
 * Component to render social media icons with links.
 * @param props - The properties for the `SocialMediaIcons` component.
 * @param props.links - An array of objects containing the name of the social media platform and its corresponding URL.
 * @returns The rendered social media icons.
 */
export const SocialMediaIcons = ({ links }: SocialMediaIconsProps) => {
    return (
        <div className={cls.socialMediaIcons}>
            {links.map((link) => {
                const icon = SoMeIcons[link.name];
                if (!icon) return null; // skip if the icon is not found
                return (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cls.iconLink}
                        role="link"
                        aria-label={link.name}
                    >
                        <FontAwesomeIcon icon={icon} />
                    </a>
                );
            })}
        </div>
    );
};
