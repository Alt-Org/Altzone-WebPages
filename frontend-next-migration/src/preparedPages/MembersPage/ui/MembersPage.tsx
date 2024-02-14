'use client'
import {Navbar} from "@/widgets/Navbar";
import cls from './MembersPage.module.scss'
import {SectionMembers} from "@/widgets/SectionMembers";
import {classNames} from "@/shared/lib/classNames/classNames";
import backgroundImg from '@/shared/assets/images/clanBg/space.webp'
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";
import {ScrollTop} from "@/features/ScrollTop";

const MembersPage = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            <div className={cls.navbarWrapper}>
            <Navbar overlaid={true} className={cls.navbar}/>
            </div>
            <SectionMembers  className={cls.workersSection}/>
            <ScrollTop/>
        </div>
    );
};

export default  withBackgroundImage({
    alt: "Members-Page space background",
    imagePath: backgroundImg  as unknown as string,
    shouldBeLazyLoaded: true
})(MembersPage);


