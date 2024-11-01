import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { getLinks } from '../api/mappers';
import { Member } from '../model/types/types';
import cls from './MemberItem.module.scss';

const MemberItem: FC<{ member: Member }> = ({ member }) => {
    const linksMap = getLinks();
    /**
     * Manage the enlarged mode of the image.
     * @description When the boolean value is true, image is enlarged
     * @type {boolean}
     * @default false
     */
    const [isEnlarged, setIsEnlarged] = useState(false);
    /**
     * Handles image clicking. Changes the state of the image.
     */
    const handleClick = () => {
        setIsEnlarged(!isEnlarged);
    }

    return (
        <li className={cls.workmanComponent}>
            <div className={cls.memberRow}>
                <div className={cls.centerContainer}>
                    <span className={cls.memberName}>{member.name}</span>
                    <span className={cls.taskText}>{member.task}</span>
                    <div className={cls.iconContainer}>
                        {/** Change Div Size For Enlarged Image */}
                        <div className={`${cls.memberLogo} ${isEnlarged ? cls.memberLogoEnlarged : ''}`}>
                            {member.logo ? (
                                <Image
                                    src={member.logo}
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
                            const link = member[key as keyof Omit<Member, 'id'>];
                            if (link) {
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
