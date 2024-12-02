import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { getLinks } from '../api/mappers';
import { Member } from '../model/types/types';
import cls from './MemberItem.module.scss';

const MemberItem: FC<{ member: Member }> = ({ member }) => {
    const linksMap = getLinks();

    return (
        <li className={cls.workmanComponent}>
            <div className={cls.memberRow}>
                <div className={cls.centerContainer}>
                    <span className={cls.memberName}>{member.name}</span>
                    <span className={cls.taskText}>{member.task}</span>
                    <div className={cls.iconContainer}>
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
