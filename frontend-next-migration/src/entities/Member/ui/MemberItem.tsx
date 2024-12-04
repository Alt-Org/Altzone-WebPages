import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { getLinks } from '../api/mappers';
import { Member } from '../model/types/types';
import cls from './MemberItem.module.scss';
import { envHelper } from '@/shared/const/envHelper';

interface MemberItemProps {
    member: Member;
    language: string; // Adds the selected language to props
}

const MemberItem: FC<MemberItemProps> = ({ member, language }) => {
    const linksMap = getLinks();

    const logoUrl =
        member.logo && typeof member.logo !== 'string' && member.logo.id
            ? `${envHelper.strapiHost}/assets/${member.logo.id}`
            : null;

    const fullLanguageCode = language === 'en' ? 'en-US' : language === 'fi' ? 'fi-FI' : 'default';
    const translation = member.translations?.find((t) => t.languages_code === fullLanguageCode);
    const task = translation?.task;

    return (
        <li className={cls.workmanComponent}>
            <div className={cls.memberRow}>
                <div className={cls.centerContainer}>
                    <span className={cls.memberName}>{member.name}</span>
                    <span className={cls.taskText}>{task}</span>
                    <div className={cls.iconContainer}>
                        <div className={cls.memberLogo}>
                            {logoUrl ? (
                                <Image
                                    src={logoUrl}
                                    alt={member.name}
                                    className={cls.Logo}
                                    width={500}
                                    height={500}
                                />
                            ) : (
                                <div className={cls.placeholderLogo} />
                            )}
                        </div>
                        {Object.entries(linksMap).map(([key, icon]) => {
                            const link = member[key as keyof Member];
                            if (typeof link === 'string') {
                                const href = key === 'email' ? `mailto:${link}` : link;
                                const target = key === 'email' ? '_self' : '_blank';
                                return (
                                    <Link
                                        key={key}
                                        href={href}
                                        className={cls.clickableLogo}
                                        target={target}
                                        rel="noopener noreferrer"
                                    >
                                        <FontAwesomeIcon icon={icon} />
                                    </Link>
                                );
                            }
                            return null;
                        })}
                    </div>
                </div>
            </div>
        </li>
    );
};
export default MemberItem;
