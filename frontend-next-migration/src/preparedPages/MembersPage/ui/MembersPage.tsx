'use client';
import { SectionMembers } from '@/widgets/SectionMembers';
import cls from './MembersPage.module.scss';
import { FC } from 'react';
import PageTitle from '@/shared/ui/PageTitle/ui/PageTitle';
import { MosaicGrid } from '@/shared/ui/v2/MosaicGrid';
import { ScrollBottomButton } from '@/app/[lng]/(intro)/team/_components/_ScrollBottomButton';
import play from '@/shared/assets/icons/playIcon.svg';
import ExternalLink from '@/shared/assets/icons/ExternalLink.svg';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container/ui/Container';
import { useGetMembersQuery } from '@/entities/Member/api/membersApi';
import Link from 'next/link';
import Image from 'next/image';

/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component.
 */

const MembersPage: FC = () => {
    const { t } = useClientTranslation('members');
    const {
        data: members = [],
        isError,
        isLoading,
    } = useGetMembersQuery(undefined, {
        refetchOnMountOrArgChange: false,
    });
    const membersWithPortrait = members.filter((member) => member.portrait);
    return (
        <>
            <PageTitle
                titleText={t('team-title')}
                searchVisible={false}
                alternate={true}
            />
            <div className={cls.MosaicGridContainer}>
                <h3 className={cls.Title}>{t('team-title')}</h3>
                <p className={cls.Description}>{t('team-description')}</p>
                <MosaicGrid
                    className={cls.MosaicGrid}
                    members={membersWithPortrait}
                />
                <Link
                    href="/members"
                    className={cls.Link}
                >
                    <span className={cls.LinkText}>{t('link-to-prg')}</span>
                    <Image
                        className={cls.LinkIcon}
                        src={ExternalLink}
                        alt="External Link Icon"
                    />
                </Link>
            </div>
            <div className={cls.buttonContainer}>
                <ScrollBottomButton
                    IdToScrollBeforePlay={'members'}
                    className={cls.diveButton}
                    image={play}
                />
            </div>
            <div className={cls.Members}>
                <SectionMembers className={cls.workersSection} />
            </div>
        </>
    );
};

export default MembersPage;
