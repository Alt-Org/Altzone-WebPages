'use client';
import { SectionMembers } from '@/widgets/SectionMembers';
import cls from './MembersPage.module.scss';
import { FC } from 'react';
import PageTitle from '@/shared/ui/PageTitle/ui/PageTitle';
import { MosaicGrid } from '@/shared/ui/v2/MosaicGrid';
import { ScrollBottomButton } from '@/app/[lng]/(intro)/team/_components/_ScrollBottomButton';
import play from '@/shared/assets/icons/playIcon.svg';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container/ui/Container';

/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component.
 */

const MembersPage: FC = () => {
    const { t } = useClientTranslation('members');
    return (
        <>
            <PageTitle
                titleText={t('team-title')}
                searchVisible={false}
                alternate={true}
            />
            <Container>
                <MosaicGrid className={cls.MosaicGrid} />
            </Container>
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
