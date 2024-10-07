/**
 * The above code defines a React functional component for a Members Page with a background image
 * applied using a higher-order component.
 * @returns The `MembersPage` component is being returned. It is a functional component that renders a
 * `SectionMembers` component within a `div` element with specific class names. Additionally, the
 * `MembersPage` component is being exported with a background image using the `withBackgroundImage`
 * higher-order component, which provides properties such as alt text, image path, lazy loading, and a
 * specific class name for
 */
'use client'; // Ensures this is a client-side component

import { FC } from 'react';
import { SectionMembers } from '@/widgets/SectionMembers';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MembersPage.module.scss';
import backgroundImg from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';

const MembersPage: FC = () => {
  return (
    <div className={classNames(cls.MembersPage)}>
      <SectionMembers className={cls.workersSection} />
    </div>
  );
};

/* The code `export default withBackgroundImage({ ... })(MembersPage);` is applying a higher-order
component (HOC) called `withBackgroundImage` to the `MembersPage` component before exporting it. */
export default withBackgroundImage({
  alt: 'Members-Page space background',
  imagePath: backgroundImg as unknown as string,
  shouldBeLazyLoaded: true,
  className: cls.wholePageBG,
})(MembersPage);
