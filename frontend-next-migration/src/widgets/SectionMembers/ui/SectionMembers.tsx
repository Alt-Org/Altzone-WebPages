import cls from './SectionMembers.module.scss';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchTeams, Team, Member } from '../model/membersApi';
import { ScrollBottomButton } from '@/features/ScrollBottom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Container } from '@/shared/ui/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faLinkedin,
  faInstagram,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab';
import { useClientTranslation } from '@/shared/i18n';
import Image from 'next/image';

const MemberItem: FC<{ member: Member }> = ({ member }) => (
  <li key={member.id} className={cls.workmanComponent}>
    <div className={cls.memberRow}>
      <div className={cls.centerContainer}>
        <span className={cls.memberName}>{member.name}</span>
        <span className={cls.taskText}>{member.task}</span>
        <div className={cls.iconContainer}>
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
    {member.logo && (
      <Image
        src={member.logo}
        alt={member.name}
        className={cls.memberLogo}
        width={50}
        height={50}
      />
    )}
  </li>
);

interface WorkersSectionProps {
  className?: string;
}

export const SectionMembers: FC<WorkersSectionProps> = ({ className = '' }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const params = useParams();
  const lng = params.lng as string; // tämä on nyt lokaali, esim. 'fi-FI'
  const { t } = useClientTranslation(lng, 'team');

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const data = await fetchTeams(lng); // Välitetään oikea lokaali
        setTeams(data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };
    fetchTeamsData();
  }, [lng]); // Locale varmistetaan, että päivitetään oikea lokaali

  return (
    <div className={classNames(cls.MembersSection, {}, [className])}>
      <ScrollBottomButton
        className={cls.scrollBottomButton}
        text={t('playButton')}
      />
      <Container className={cls.membersListContainer}>
        {teams.map((team) => {
          // Käydään läpi tiimin jäsenet ja osastot
          return (
            <div key={team.id} className={cls.memberCard}>
              <h1 className={cls.membersListContainer}>{team.name}</h1>

              {/* Tarkistetaan, onko osastoja */}
              {team.departments.length > 0 && (
                <div className={cls.departmentsSection}>
                  {team.departments.map((department) => (
                    <div key={department.id} className={cls.departmentCard}>
                      <h2>{department.name}</h2>{' '}
                      {/* Lokalisoitu osaston nimi */}
                      {/* Renderöidään osaston jäsenet */}
                      {department.members.length > 0 && (
                        <ul className={cls.departmentMembersList}>
                          {department.members.map((member: Member) => (
                            <MemberItem key={member.id} member={member} />
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Renderöidään tiimin jäsenet, jotka eivät kuulu osastoihin */}
              {team.members.length > 0 && (
                <ul className={cls.membersList}>
                  {team.members.map((member: Member) => (
                    <MemberItem key={member.id} member={member} />
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </Container>
    </div>
  );
};
