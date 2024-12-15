'use client';
import { FC } from 'react';
import { SectionMembers } from '@/widgets/SectionMembers';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MembersPage.module.scss';

/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component.
 */
const MembersPage: FC = () => {
    return (
        <div
            id={'members'}
            className={classNames(cls.MembersPage)}
        >
            <SectionMembers className={cls.workersSection} />
        </div>
    );
};

export default MembersPage;
