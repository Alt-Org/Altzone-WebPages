import { FC } from 'react';
import { Member } from '../model/types';
import cls from './SectionMembers.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab';
import Image from 'next/image';
import { ClickableBorder } from '@/shared/ui/ClickableBorder';
import { classNames } from '../../../shared/lib/classNames/classNames';

/**
 * MemberItem component displays information about a specific member.
 * It includes member's name, task, logo, and relevant links like website, GitHub, LinkedIn, etc.
 */
const MemberItem: FC<{ member: Member }> = ({ member }) => {
  return (
    <li key={member.id} className={cls.workmanComponent}>
      <div className={cls.memberRow}>
        <div className={cls.centerContainer}>
          <span className={cls.memberName}>{member.name}</span>
          <span className={cls.taskText}>{member.task}</span>
          <div className={cls.iconContainer}>
            {/* Render logo if available, otherwise render an empty placeholder */}
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
            {member.website && (
              <span
                onClick={() => openLinkInNewTab(member.website)}
                className={cls.clickableLogo}>
                <FontAwesomeIcon icon={faGlobe} />
              </span>
            )}
            {member.github && (
              <span
                onClick={() => openLinkInNewTab(member.github)}
                className={cls.clickableLogo}>
                <FontAwesomeIcon icon={faGithub} />
              </span>
            )}
            {member.linkedin && (
              <span
                onClick={() => openLinkInNewTab(member.linkedin)}
                className={cls.clickableLogo}>
                <FontAwesomeIcon icon={faLinkedin} />
              </span>
            )}
            {member.facebook && (
              <span
                onClick={() => openLinkInNewTab(member.facebook)}
                className={cls.clickableLogo}>
                <FontAwesomeIcon icon={faFacebook} />
              </span>
            )}
            {member.instagram && (
              <span
                onClick={() => openLinkInNewTab(member.instagram)}
                className={cls.clickableLogo}>
                <FontAwesomeIcon icon={faInstagram} />
              </span>
            )}
            {member.email && (
              <span
                onClick={() => openLinkInNewTab(`mailto:${member.email}`)}
                className={cls.clickableLogo}>
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MemberItem;
