'use client';
import { FC } from 'react';
import { SectionMembers } from '@/widgets/SectionMembers';
import { classNames } from '@/shared/lib/classNames/classNames';
import backgroundImg from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import cls from './MembersPage.module.scss';

/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component that renders a
 * `SectionMembers` component within a `div` element with specific class names. Additionally, the
 * `MembersPage` component is being exported with a background image using the `withBackgroundImage`
 * higher-order component, which provides properties such as alt text, image path, lazy loading, and a
 * specific class name for
 */
const MembersPage: FC = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            <SectionMembers className={cls.workersSection} />
        </div>
    );
};

export default MembersPage;
