import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { getLinks } from '../api/mappers';
import { Member } from '../model/types/types';
import cls from './MemberItem.module.scss';
import { envHelper } from '@/shared/const/envHelper';
import { getTaskTranslation, getLanguageCode } from '../api/translations';

interface MemberItemProps {
    member: Member;
    language: string;
}

const MemberItem: FC<MemberItemProps> = ({ member, language }) => {
    /**
     * Manage the enlarged mode of the image.
     * @description When the boolean value is true, image is enlarged.
     * @type {boolean}
     * @default false
     */
    const [isEnlarged, setIsEnlarged] = useState<boolean>(false);
    /**
     * Handles image clicking. Changes the state of the image.
     */
    const handleClick = () => {
        setIsEnlarged(!isEnlarged);
    };

    const linksMap = getLinks();

    const logoUrl =
        member.logo && typeof member.logo === 'object' && 'id' in member.logo
            ? `${envHelper.strapiHost}/assets/${member.logo.id}`
            : null;

    const fullLanguageCode = getLanguageCode(language);
    const task = getTaskTranslation(member.translations || [], fullLanguageCode);

    return (
        <li className={cls.workmanComponent}>
            <div className={cls.memberRow}>
                <div className={cls.centerContainer}>
                    <span className={cls.memberName}>{member.name}</span>
                    <span className={cls.taskText}>{task}</span>
                    <div className={cls.iconContainer}>
                        <div
                            className={`${cls.memberLogo} ${isEnlarged ? cls.memberLogoEnlarged : ''}`}
                        >
                            {logoUrl ? (
                                <Image
                                    src={logoUrl}
                                    alt={member.name}
                                    className={cls.Logo}
                                    onClick={handleClick}
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
