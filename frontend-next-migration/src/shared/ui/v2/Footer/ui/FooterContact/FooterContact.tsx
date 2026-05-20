import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLink } from '@fortawesome/free-solid-svg-icons';
import cls from './FooterContact.module.scss';

/** Props for the FooterContact component, which displays contact information in the footer. */
interface FooterContactProps {
    className?: string;
    title: string;
    emailLabel?: string;
    emails: string[];
    workWithUsLabel?: string;
}

const DUUNITORI_JOBS_URL = 'https://duunitori.fi/tyopaikat?haku=Psyche%27s%20Royale%20Gaming';

/** Component for displaying contact information in the footer, including email addresses and a "Work with us" link. */
export const FooterContact = memo((props: FooterContactProps) => {
    const { className = '', title, emailLabel, emails, workWithUsLabel } = props;

    /* Render the footer contact section with a title, optional email label, list of email addresses, and a "Work with us" link. */
    return (
        <div className={classNames(cls.FooterContact, {}, [className])}>
            <h3 className={cls.Title}>{title}</h3>
            {emailLabel && <p className={cls.EmailLabel}>{emailLabel}</p>}
            <ul className={cls.EmailList}>
                {emails.map((email, index) => (
                    <li key={index}>
                        <a
                            href={`mailto:${email}`}
                            className={cls.Email}
                        >
                            {email}
                        </a>
                    </li>
                ))}
            </ul>
            {workWithUsLabel && (
                <AppLink
                    to={DUUNITORI_JOBS_URL}
                    isExternal={true}
                    className={cls.WorkWithUsLink}
                >
                    {workWithUsLabel}
                    <FontAwesomeIcon
                        icon={faExternalLink}
                        className={cls.ExternalIcon}
                    />
                </AppLink>
            )}
        </div>
    );
});

FooterContact.displayName = 'FooterContact';
