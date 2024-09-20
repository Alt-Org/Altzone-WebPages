'use client'
import cls from './MembersPage.module.scss'
import {SectionMembers} from "@/widgets/SectionMembers";
import {classNames} from "@/shared/lib/classNames/classNames";
import backgroundImg from "@/shared/assets/images/backgrounds/background.webp";
import {withBackgroundImage} from "@/shared/lib/hocs/withBackgroundImage";

const MembersPage = () => {
    return (
        <div className={classNames(cls.MembersPage)}>
            <SectionMembers  className={cls.workersSection}/>
        </div>
    );
};

export default  withBackgroundImage({
    alt: "Members-Page space background",
    imagePath: backgroundImg  as unknown as string,
    shouldBeLazyLoaded: true,
    className: cls.wholePageBG
})(MembersPage);


