import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Member } from '../model/types/types';
import cls from './MemberItem.module.scss';
import { getLinks } from '../api/mappers';

const MemberItem: FC<{ member: Member }> = ({ member }) => {
  const linksMap = getLinks();

  return (
    <li className={cls.workmanComponent}>
      <div className={cls.memberRow}>
        <div className={cls.centerContainer}>
          <span className={cls.memberName}>{member.name}</span>
          <span className={cls.taskText}>{member.task}</span>
          <div className={cls.iconContainer}>
            <div className={cls.memberLogo}>
              {member.logo ? (
                <Image
                  src={member.logo}
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
              const link = member[key as keyof Omit<Member, "id">];
              if (link) {
                const href = key === 'email' ? `mailto:${link}` : link;
                const target = key === 'email' ? '_self' : '_blank';
                return (
                  <Link
                    key={key}
                    href={href}
                    className={cls.clickableLogo}
                    target={target}
                    rel='noopener noreferrer'>
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
